const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const { mongoose } = require("mongoose");

// Display all posts, user feed of their posts and friend posts
exports.userFeed = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  // fetch user and friend's list
  const user = await User.findById(userId).populate("friends");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // convert userId to MongoDB ObjectId
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const userPosts = await Post.aggregate([
    {
      $match: {
        // match posts by user and their friends
        user: userObjectId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $addFields: {
        commentCount: { $size: "$comments" },
        likeCount: { $size: "$likes" },
      },
    },
    {
      $project: {
        body: 1,
        timestamp: 1,
        "user.username": "$userDetails.username",
        "user.profilePic": "$userDetails.profilePic",
        likes: 1,
        likeCount: 1,
        comments: 1,
        commentCount: 1,
      },
    },
  ]);

  const friendIds = user.friends.map((friend) => friend._id);
  const friendPosts = await Post.aggregate([
    {
      $match: {
        // match posts by user and their friends
        user: { $in: friendIds },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $addFields: {
        commentCount: { $size: "$comments" },
        likeCount: { $size: "$likes" },
      },
    },
    {
      $project: {
        body: 1,
        timestamp: 1,
        "user.username": "$userDetails.username",
        "user.profilePic": "$userDetails.profilePic",
        likes: 1,
        likeCount: 1,
        comments: 1,
        commentCount: 1,
      },
    },
  ]);

  res.json({ userPosts, friendPosts });

  // // fetch user's posts
  // const userPosts = await Post.find({ user: userId })
  //   .sort({ timestamp: -1 })
  //   .populate("user", "username profilePic")
  //   .populate({
  //     path: "comments",
  //     populate: { path: "user", select: "username profilePic" },
  //   });

  // // create an array of friend Ids and own
  // const friendIds = user.friends.map((friend) => friend._id);
  // const friendsPosts = await Post.find({ user: { $in: friendIds } })
  //   .sort({ timestamp: -1 })
  //   .populate("user", "username profilePic")
  //   .populate({
  //     path: "comments",
  //     populate: { path: "user", select: "username profilePic" },
  //   });

  // res.json({ userPosts, friendsPosts });
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
  const authenticatedUserId = req.params.userId;

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
  const authenticatedUserId = req.params.userId;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.likes.includes(authenticatedUserId)) {
    post.likes.pull(authenticatedUserId);
    await post.save();
    res.status(200).json({ post, message: "Post unliked successfully" });
  } else {
    post.likes.push(authenticatedUserId);
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
