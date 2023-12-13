const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

/// Comment Specific (using postId as base route)
// get all comments on a specific post
router.get("/:postId/comments", commentController.commentsOnAPost);

// create a comment
// update a comment (optional)
// like a comment
// delete a comment
// delete all comments on a post
// delete all likes on a post
// delete all likes on a comment
