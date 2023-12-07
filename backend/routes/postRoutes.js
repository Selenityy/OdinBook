const express = require("express");
const router = express.Router();

/// Post Specific
// get all posts (could be the same as feed on users)
// get all likes on a post

// create a post
// update a post (optional)
// delete a post
// like a post

/// Comment Specific (using postId as base route)
// get all comments on a specific post
// get a single comment on a post (optional)
// get all likes on a comment

// create a comment
// update a comment (optional)
// like a comment
// delete a comment
// delete all comments on a post
// delete all likes on a post
// delete all likes on a comment

module.exports = router;