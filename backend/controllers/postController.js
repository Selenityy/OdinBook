const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

// Display all posts, user feed of their posts and friend posts
exports.userFeed = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  // fetch user and friend's list
  const user = await User.findById(userId).populate("friends");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // create an array of friend Ids and own
  const friendIds = user.friends.map((friend) => friend._id);
  friendIds.push(user._id);

  const posts = await Post.find({
    user: { $in: friendIds },
  })
    .sort({ timestamp: -1 })
    .populate({
      path: "user",
      select: "username profilePic",
    })
    // .populate({
    //    path: "likeCount",
    //  })
    // should be able to access through post.likeCount
    .populate({
      path: "comments",
      // select: "body likeCount",
      // should be able to access through comment.likeCount
      populate: {
        path: "user",
        select: "username profilePic",
      },
    });

  res.json(posts);
});

// Create post
exports.createPost = [
  // Validation middleware
  body("body")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("The post body cannot be empty"),

  // Controller logic
  asyncHandler(async (req, res, next) => {
    const authenticatedUserId = req.user._id;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = new Post({
      body: req.body.body,
      user: authenticatedUserId,
    });
    const savedPost = await post.save();

    // Update user's posts
    await User.findOneAndUpdate(
      { _id: authenticatedUserId },
      { $push: { posts: savedPost._id } }
    );

    res
      .status(200)
      .json({ post: savedPost, message: "Post created successfully" });
  }),
];

// Update post
exports.updateSpecificPost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  const authenticatedUserId = req.user._id;

  if (userId !== authenticatedUserId.toString()) {
    return res.status(403).json({ message: "Unauthorized to update a post" });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { body: req.body.body },
    { new: true }
  );

  if (!updatedPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(updatedPost);
});

// Like a post
exports.likeAPost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  const authenticatedUserId = req.user._id;

  if (userId !== authenticatedUserId.toString()) {
    return res.status(403).json({ message: "Unauthorized to like a post" });
  }

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
    await post.save();
    res.status(200).json({ post, message: "Post unliked successfully" });
  } else {
    post.likes.push(userId);
    await post.save();
    res.status(200).json({ post, message: "Post liked successfully" });
  }
});

// Delete a post
exports.deleteSpecificPost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const authenticatedUserId = req.params.userId;

  const deletedPost = await Post.findByIdAndDelete(postId);

  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found" });
  }
  // deleted associated comments
  await Comment.deleteMany({ post: postId });

  // remove post id from the user's post array
  await User.findByIdAndUpdate(authenticatedUserId, {
    $pull: { posts: postId },
  });

  res.json({ message: "Post deleted successfully" });
});
