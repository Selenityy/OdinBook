const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    postController.userFeed(req, res, next);
  } else {
    res.redirect("/login");
  }
});

// USER
// GET: User information
router.get("/:userId", userController.getUserInfo);

// POST: Authentications
router.post("/signup", userController.signup);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userController.login
);
router.get("/logout", userController.logout);

// PUT: Updates
router.put("/:userId/username", userController.updateUserUsername);
router.put("/:userId/about", userController.updateUserAbout);
router.put("/:userId//profilePic", userController.updateUserProfilePic);

// DELETE: Deletions
router.delete("/:userId/account", userController.deleteUserAccount);

// FRIENDS
//GET
router.get(
  "/:userId/pendingFriendRequests",
  userController.getPendingFriendRequests
);

// POST
router.post("/:userId/sendFriendRequest", userController.sendFriendRequest);
router.post(
  "/:userId/acceptFriendRequest/:friendId",
  userController.acceptFriendRequest
);
router.post(
  "/:userId/rejectFriendRequest/:friendId",
  userController.rejectFriendRequest
);
router.post("/:userId/unFriend/:friendId", userController.unfriend);
router.post(
  "/:userId/deleteFriendRequest/:friendId",
  userController.deleteFriendRequest
);

const postRouter = require("./postRoutes");
router.use("/:userId/posts", postRouter);

module.exports = router;
