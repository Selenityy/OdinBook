const express = require("express");
const router = express.Router({ mergeParams: true });
const postController = require("../controllers/postController");

// GET: Fetching
router.get("/", postController.userFeed);

// POST: Creation
router.post("/", postController.createPost);

// PUT: Updating
router.put("/:postId/", postController.updateSpecificPost);
router.put("/:postId/like", postController.likeAPost);

// DELETE: Deletion
router.delete("/:postId/", postController.deleteSpecificPost);

const commentRouter = require("./commentRoutes");
router.use("/:postId/comments", commentRouter);

module.exports = router;
