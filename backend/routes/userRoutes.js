const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.get("/", (req, res, next) => {
  res.send("this is a homepage");
});

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
router.put(
  "/:userId//profilePic",
  userController.updateUserProfilePic
);

// DELETE: Deletions
router.delete("/:userId/account", userController.deleteUserAccount);

// user request to be friends
// user accept friend request
// user reject friend request
// user unfriend
// user delete their own friend request

const postRouter = require("./postRoutes");
router.use("/:userId/posts", postRouter);

module.exports = router;
