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
router.get("/:userId/info", userController.getUserInfo);

// POST: Authentications
router.post("/signup", userController.signup);
router.post(
  "/login",
  // passport.authenticate("local", { session: false }),
  userController.login
);
router.get("/logout", userController.logout);

// PUT: Updates
router.put("/:userId/:username", userController.updateUserUsername);
router.put("/:userId/:username/about", userController.updateUserAbout);
router.put("/:userId//profilePic", userController.updateUserProfilePic);

// DELETE: Deletions
router.delete("/:userId/account", userController.deleteUserAccount);

// FRIENDS
//GET
router.get(
  "/:userId/pendingFriendRequests",
  passport.authenticate("jwt", { session: false }),
  userController.getPendingFriendRequests
);

// POST
router.post(
  "/:userId/sendFriendRequest/:friendUsername",
  userController.sendFriendRequest
);
router.post(
  "/:userId/acceptFriendRequest/:friendUsername",
  passport.authenticate("jwt", { session: false }),
  userController.acceptFriendRequest
);
router.post(
  "/:userId/rejectFriendRequest/:friendUsername",
  passport.authenticate("jwt", { session: false }),
  userController.rejectFriendRequest
);
router.post(
  "/:userId/unFriend/:friendUsername",
  passport.authenticate("jwt", { session: false }),
  userController.unfriend
);
router.post(
  "/:userId/deleteFriendRequest/:friendUsername",
  passport.authenticate("jwt", { session: false }),
  userController.deleteFriendRequest
);

const postRouter = require("./postRoutes");
router.use("/:userId/posts", postRouter);

module.exports = router;
