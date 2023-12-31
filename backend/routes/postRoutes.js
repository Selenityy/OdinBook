const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const postController = require("../controllers/postController");

// GET: Fetching
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.userFeed
);

// POST: Creation
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

// PUT: Updating
router.put(
  "/:postId/",
  passport.authenticate("jwt", { session: false }),
  postController.updateSpecificPost
);
router.put(
  "/:postId/like",
  passport.authenticate("jwt", { session: false }),
  postController.likeAPost
);

// DELETE: Deletion
router.delete(
  "/:postId/",
  passport.authenticate("jwt", { session: false }),
  postController.deleteSpecificPost
);

const commentRouter = require("./commentRoutes");
router.use("/:postId/comments", commentRouter);

module.exports = router;
