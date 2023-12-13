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
