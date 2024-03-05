const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const commentController = require("../controllers/commentController");

// GET: Fetching
router.get("/", commentController.commentsOnAPost);
router.get(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentController.uniqueComment
);

// POST: Creating
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  commentController.createComment
);

// PUT: Updating
router.put(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentController.updateComment
);
router.put(
  "/:commentId/like",
  passport.authenticate("jwt", { session: false }),
  commentController.likeComment
);

// DELETE: Removing
router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentController.deleteSpecificComment
);

module.exports = router;
