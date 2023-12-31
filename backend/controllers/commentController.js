const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

// Display comments on a post
exports.commentsOnAPost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const postWithComments = await Post.findById(postId).populate({
    path: "comments",
    select: "body likeCount",
    populate: {
      path: "user",
      select: "username profilePic",
    },
  });
  if (!postWithComments) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(postWithComments.comments);
});

// Create a comment
exports.createComment = [
  // Validation middleware
  body("body")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("The comment body cannot be empty"),

  // Controller logic
  asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    const authenticatedUserId = req.user._id;

    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const comment = new Comment({
      body: req.body.body,
      user: authenticatedUserId,
      post: postId,
    });
    const savedComment = await comment.save();
    res
      .status(200)
      .json({ comment: savedComment, message: "Comment created successfully" });
  }),
];

// Update a comment
exports.updateComment = [
  // Validation middleware
  body("body")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("The comment body cannot be empty or too long"),

  // Controller Logic
  asyncHandler(async (req, res, next) => {
    const commentId = req.params.commentId;
    const authenticatedUserId = req.params.userId;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { body: req.body.body },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(updatedComment);
  }),
];

// Like a comment
exports.likeComment = asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.params.userId;
  const authenticatedUserId = req.user._id;

  if (userId !== authenticatedUserId.toString()) {
    return res.status(403).json({ message: "Unauthorized to like a comment" });
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
  }

  if (comment.likes.includes(userId)) {
    comment.likes.pull(userId);
    await comment.save();
    res.status(200).json({ comment, message: "Comment unliked successfully" });
  } else {
    comment.likes.push(userId);
    await comment.save();
    res.status(200).json({ comment, message: "Comment liked successfully" });
  }
});

// Delete a comment
exports.deleteSpecificComment = asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentId;
  const authenticatedUserId = req.params.userId;
  const postId = req.params.postId;

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  res.json({ message: "Comment deleted successfully" });
});
