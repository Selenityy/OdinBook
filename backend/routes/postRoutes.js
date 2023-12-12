const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET: Fetching
router.get("/:userId/userFeed", postController.userFeed);

// POST: Creation
router.post("/:userId/createPost", postController.createPost);

// PUT: Updating
router.put("/:userId/:postId/update", postController.updateSpecificPost);
router.put("/:postId/like", postController.likeAPost);

// DELETE: Deletion
router.delete("/:userId/:postId/delete", postController.deleteSpecificPost);

module.exports = router;
