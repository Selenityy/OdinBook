const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.get("/user", (req, res, next) => {
  res.send("this is a homepage");
});

// GET: User information
router.get("/user/:userId", userController.getUserInfo);

// POST: Authentications
router.post("/user/signup", userController.signup);
router.post(
  "/user/login",
  passport.authenticate("local", { session: false }),
  userController.login
);
router.post("/user/logout", userController.logout);

// PUT: Updates
router.put("/:userId/update/username", userController.updateUserUsername);
router.put("/:userId/update/about", userController.updateUserAbout);
router.put("/:userId/update/profilePic", userController.updateUserProfilePic);

// DELETE: Deletions
router.delete("/:userId/delete/account", userController.deleteUserAccount);

// user request to be friends
// user accept friend request
// user reject friend request
// user unfriend
// user delete their own friend request

module.exports = router;
