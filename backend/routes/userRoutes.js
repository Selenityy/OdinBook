const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.get("/user", (req, res, next) => {
  res.send("this is a homepage");
});

/// User
// user sign up
router.post("/user/signup", userController.signup);
// user log in
router.post(
  "/user/login",
  passport.authenticate("local", { session: false }),
  userController.login
);
// user log out
router.post("/user/logout", userController.logout);

// user get username
// user update username
// user get about
// user update about
// user delete about
// user get profile picture
// user update profile picture
// user delete account

// (below could be used in postRoutes instead of here)
// user get feed
// user create a post
// user like a post
// user create a comment
// user like a comment

/// Friends
// user get friends list
// user get friend request list
// user request to be friends
// user accept friend request
// user reject friend request
// user unfriend
// user delete their own friend request

module.exports = router;
