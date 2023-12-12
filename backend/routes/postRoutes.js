const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET: Fetching
router.get("/:userId/userFeed", postController.userFeed);

// POST: Creation
router.post("/:userId/createPost", postController.createPost);

// PUT: Updating
router.put("/:userId/:postId/update", postController.updateSpecificPost);

// DELETE: Deletion
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
