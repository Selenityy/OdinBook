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

// Get a specific comment
exports.uniqueComment = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId)
      .populate("user", "username profilePic")
      .populate({
        // Populate comments array
        path: "comments", // Path to the comments array
        select: "body user comment likes likeCount comments commentCount",
        populate: {
          // Nested population for the user within each comment
          path: "user", // Path to the user field in each comment
          select: "username profilePic", // Fields to select for the user
        },
      })
      .exec();

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    const commentObject = comment.toObject();
    res.json(commentObject);
  } catch (error) {
    next(error);
  }
});

// Create a comment on a post
exports.createCommentOnPost = [
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

    const populatedComment = await Comment.findById(savedComment._id)
      .populate("user", "username profilePic")
      .exec();

    res.status(200).json({
      comment: populatedComment,
      message: "Comment created successfully",
    });
  }),
];

// Create a comment on a comment
exports.createCommentOnComment = [
  // Validation middleware
  body("body")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("The comment body cannot be empty"),

  // Controller logic
  asyncHandler(async (req, res, next) => {
    const { commentId, userId: authenticatedUserId } = req.body;

    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const comment = new Comment({
      body: req.body.body,
      user: authenticatedUserId,
      comment: commentId,
    });

    // Save new comment
    const savedComment = await comment.save();

    const populatedComment = await Comment.findById(savedComment._id)
      .populate("user", "username profilePic")
      .exec();

    // Find and update parent comment
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    // Add the new comment's ID to the parent's comment array
    parentComment.comments.push(savedComment._id);
    parentComment.commentCount = parentComment.comments.length;
    await parentComment.save();

    // Fetch and return the updated parent comment with populated comments
    const updatedParentComment = await Comment.findById(commentId)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username profilePic",
        },
      })
      .exec();

    // Return updated parent comment
    res.status(200).json({
      parentComment: updatedParentComment,
      comment: populatedComment,
      message: "Comment created successfully",
    });
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

    console.log("backend:", updatedComment);
    res.json({
      message: "Comment updated successfully",
      updatedComment: updatedComment,
    });
  }),
];

// Like a comment
exports.likeComment = asyncHandler(async (req, res, next) => {
  // const commentId = req.params.commentId;
  // const authenticatedUserId = req.params.userId;
  // use req.body instead of req.params
  const { commentId, userId: authenticatedUserId } = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
  }

  let responseMessage = "";
  if (comment.likes.includes(authenticatedUserId)) {
    comment.likes.pull(authenticatedUserId);
    comment.likeCount = Math.max(0, comment.likeCount - 1);
    responseMessage = "Comment unliked successfully";
    await comment.save();
  } else {
    comment.likes.push(authenticatedUserId);
    comment.likeCount += 1;
    responseMessage = "Comment liked successfully";
    await comment.save();
  }

  const updatedComment = await (
    await Comment.findById(commentId)
  ).populate("user", "_id");

  res.status(200).json({
    message: responseMessage,
    updatedComment: updatedComment.toObject({ getters: true }),
    likeCount: updatedComment.likeCount,
  });
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
  // Remove comment id from the post's comment array
  await Post.findByIdAndUpdate(postId, {
    $pull: { comments: commentId },
  });

  // If this comment has replies (nested comments), you'll also want to delete them.
  // This assumes that your comments can have nested comments/replies.
  await Comment.deleteMany({ comment: commentId });

  // Optionally, update the parent comment if this is a nested comment
  // This is if you're keeping track of nested comments directly in a 'comments' array within each comment
  if (deletedComment.comment) {
    await Comment.findByIdAndUpdate(deletedComment.comment, {
      $pull: { comments: commentId },
    });
  }

  res.json({ message: "Comment deleted successfully" });
});
