const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

// Display all posts, user feed of their posts and friend posts
exports.userFeed = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  try {
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
  } catch (err) {
    next(err);
  }
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
    const userId = req.params.userId;
    const authenticatedUserId = req.user._id;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (userId !== authenticatedUserId.toString()) {
      return res.status(403).json({ message: "Unauthorized to create a post" });
    }

    try {
      const post = new Post({
        body: req.body.body,
        user: authenticatedUserId,
      });
      const savedPost = await post.save();
      await User.findOneAndUpdate(
        { _id: authenticatedUserId },
        { $push: { posts: savedPost._id } }
      );
      res
        .status(200)
        .json({ post: savedPost, message: "Post created successfully" });
    } catch (err) {
      next(err);
    }
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

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { body: req.body.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
});
