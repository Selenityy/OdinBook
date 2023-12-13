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
  res.json(postWithComments);
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
    const userId = req.params.userId;
    const authenticatedUserId = req.user._id;

    // Check for authorized user
    if (userId !== authenticatedUserId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to create a comment" });
    }

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
