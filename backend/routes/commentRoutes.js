const express = require("express");
const router = express.Router({ mergeParams: true });
const commentController = require("../controllers/commentController");

// GET: Fetching
router.get("/", commentController.commentsOnAPost);

// POST: Creating
router.post("/", commentController.createComment);

// PUT: Updating
router.put("/:commentId", commentController.updateComment);
router.put("/:commentId/like", commentController.likeComment);

// DELETE: Removing
router.delete("/:commentId", commentController.deleteSpecificComment);

module.exports = router;
