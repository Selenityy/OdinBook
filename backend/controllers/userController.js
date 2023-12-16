const asyncHandler = require("express-async-handler");
const { hashPassword } = require("../helpers/bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Sign up
exports.signup = asyncHandler(async (req, res, next) => {
  const { username, password, email, firstName, lastName } = req.body;
  //   const isTestUser = testUserCode === process.env.TEST_USER_CODE;
  const isTestUser = false;

  // check is username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }

  // hash the password before saving it
  const hashedPassword = await hashPassword(password);

  // create a new user instance
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    firstName,
    lastName,
    testUser: isTestUser,
  });

  // save the user to the database
  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
});

// Log in
exports.login = asyncHandler(async (req, res, next) => {
  // authenticate user
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      const error = new Error("User does not exist");
      return next(error);
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
    });

    const body = {
      _id: user._id,
      username: user.username,
    };
    const token = jwt.sign({ user: body }, process.env.SESSION_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ body, token });
  })(req, res, next);
});

// Log out
exports.logout = asyncHandler(async (req, res, next) => {
  // this will be handled on client side for a sessionless state
  res.json({ message: "Logged out" });
});

// Get user information
exports.getUserInfo = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select(
      "username email fullName about profilePic friends friendRequests posts"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Update username
exports.updateUserUsername = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const { username } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Username updated successfully",
      username: updatedUser.username,
    });
  } catch (err) {
    next(err);
  }
});

// Update about section
exports.updateUserAbout = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const { about } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { about },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "About section updated successfully",
      about: updatedUser.about,
    });
  } catch (err) {
    next(err);
  }
});

// Update profile picture
exports.updateUserProfilePic = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const { profilePic } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePic: updatedUser.profilePic,
    });
  } catch (err) {
    next(err);
  }
});

// Delete Account
exports.deleteUserAccount = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const authenticatedUserId = req.user._id;

  // Check if auth user is the same as the user being deleted
  if (userId !== authenticatedUserId.toString()) {
    return res.status(403).json({ message: "Unauthorized to delete account" });
  }

  try {
    // delete user's posts
    await Post.deleteMany({ user: userId });

    // delete user's comments
    await Comment.deleteMany({ user: userId });

    // delete user's account
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// Friending

// Get friends
exports.getPendingFriendRequests = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const authenticatedUserId = req.user._id;

  if (userId !== authenticatedUserId.toString()) {
    return res
      .status(403)
      .json({ message: "Unauthorized to see pending friend request" });
  }

  const user = await User.findById(userId).populate({
    path: "friendRequests",
    select: "username profilePic",
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ friendRequests: user.friendRequests });
});

// Send a friend request
exports.sendFriendRequest = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const requesterId = req.user._id;

  if (userId === requesterId.toString()) {
    return res
      .status(404)
      .json({ message: "Cannot send friend request to yourself" });
  }

  const recipientUser = await User.findById(userId);
  if (!recipientUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (
    recipientUser.friends.includes(requesterId) ||
    recipientUser.friendRequests.includes(requesterId)
  ) {
    return res
      .status(400)
      .json({ message: "Already friends or friend request already pending" });
  }

  recipientUser.friendRequests.push(requesterId);
  await recipientUser.save();

  res.status(200).json({ message: "Friend request sent successfully" });
});

// Accept a friend request
exports.acceptFriendRequest = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const authenticatedUserId = req.user._id;
  const friendId = req.params.friendId;

  if (userId !== authenticatedUserId.toString()) {
    return res
      .status(403)
      .json({ message: "Unauthorized to accept friend request" });
  }

  await User.findByIdAndUpdate(userId, {
    $push: { friends: friendId },
    $pull: { friendRequests: friendId },
  });
  await User.findByIdAndUpdate(friendId, { $push: { friends: userId } });
  res.status(200).json({ message: "Friend request accepted" });
});

// Reject a friend request
exports.rejectFriendRequest = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const authenticatedUserId = req.user._id;
  const friendId = req.params.friendId;

  if (userId !== authenticatedUserId.toString()) {
    return res
      .status(403)
      .json({ message: "Unauthorized to reject friend request" });
  }

  await User.findByIdAndUpdate(userId, { $pull: { friendRequests: friendId } });
  res.status(200).json({ message: "Friend request rejected" });
});

// Unfriend someone
exports.unfriend = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const authenticatedUserId = req.user._id;
  const friendId = req.params.friendId;

  if (userId !== authenticatedUserId.toString()) {
    return res.status(403).json({ message: "Unauthorized to unfriend" });
  }

  await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
  await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

  res.status(200).json({ message: "Friend removed successfully" });
});

// Delete own friend request sent
exports.deleteFriendRequest = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const requesterId = req.user._id;

  if (userId !== requesterId.toString()) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete friend request " });
  }

  await User.findByIdAndUpdate(userId, {
    $pull: { friendRequests: requesterId },
  });
  res.status(200).json({ message: "Friend request deleted successfully" });
});
