const asyncHandler = require("express-async-handler");
const { hashPassword } = require("../helpers/bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

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

  res.status(201).json({ message: "User created successfully", newUser });
});

// Log in
exports.login = asyncHandler(async (req, res, next) => {
  // authenticate user
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      if (err || !user) {
        const error = new Error("User does not exist");
        return next(error);
      }

      // req.login(user, { session: false }, (err) => {
      //   if (err) {
      //     return next(err);
      //   }
      // });

      try {
        const populatedUser = await User.findById(user._id)
          .select("-password")
          .populate("friends")
          .populate("friendRequests")
          .populate("sentRequests")
          .exec();

        const token = jwt.sign(
          { id: populatedUser._id },
          process.env.SESSION_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({ user: populatedUser, token });
      } catch (populateError) {
        next(populateError);
      }
    }
  )(req, res, next);
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

// Get all users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    } else {
      res.json(users);
    }
  } catch (error) {
    next(error);
  }
});

// Get user from token
exports.getUserFromToken = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("friends")
      .populate("friendRequests")
      .populate("sentRequests")
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update username
exports.updateUserUsername = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const newUsername = req.body.username;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
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
  const newAbout = req.body.about;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { about: newAbout },
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
  const newProfilePic = req.body.profilePic;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: newProfilePic },
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
  const authenticatedUserId = req.params.userId;

  try {
    // delete user's posts
    await Post.deleteMany({ user: authenticatedUserId });

    // delete user's comments
    await Comment.deleteMany({ user: authenticatedUserId });

    // delete user's account
    const deletedUser = await User.findByIdAndDelete(authenticatedUserId);

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
  const authenticatedUserId = req.params.userId;

  const user = await User.findById(authenticatedUserId).populate({
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
  const requesterId = req.params.userId;
  const friendUsername = req.params.friendUsername;
  const id = new mongoose.Types.ObjectId(requesterId);

  const currentUser = await User.findOne({ _id: id });
  const recipientUser = await User.findOne({ username: friendUsername });

  if (!recipientUser || !currentUser) {
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

  if (recipientUser._id.toString() === requesterId) {
    return res
      .status(404)
      .json({ message: "Cannot sent friend request to yourself" });
  }

  recipientUser.friendRequests.push(requesterId);
  currentUser.sentRequests.push(recipientUser._id);

  await recipientUser.save();
  await currentUser.save();
  const updatedCurrentUser = await User.findById(currentUser._id).populate(
    "sentRequests"
  );

  res.status(200).json({
    message: "Friend request sent successfully",
    recipientId: recipientUser._id,
    currentUser: updatedCurrentUser,
  });
});

// Accept a friend request
exports.acceptFriendRequest = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const friendUsername = req.params.friendUsername;
  const friend = await User.findOne({ username: friendUsername });
  const friendId = friend._id;

  // the friend Id is pulled out of the current user's friend requests and pushed into the current user's friends
  await User.findByIdAndUpdate(userId, {
    $push: { friends: friendId },
    $pull: { friendRequests: friendId },
  });

  // the current user Id is pulled out of the friend's sent requests and pushed into the friend's friends
  await User.findByIdAndUpdate(friendId, {
    $push: { friends: userId },
    $pull: { sentRequests: userId },
  });

  // Pull the most up to date user model for current user and friend
  const updatedRecipientUser = await User.findById(friendId)
    .populate("friends")
    .populate("friendRequests")
    .populate("sentRequests");
  const updatedCurrentUser = await User.findById(userId)
    .populate("friends")
    .populate("friendRequests")
    .populate("sentRequests");

  res.status(200).json({
    message: "Friend request accepted",
    userId,
    recipientId: updatedRecipientUser._id,
    currentUser: updatedCurrentUser,
  });
});

// Reject a friend request
exports.rejectFriendRequest = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const friendUsername = req.params.friendUsername;
  const friend = await User.findOne({ username: friendUsername });
  const friendId = friend._id;

  // the friendId is pulled from the current user's friend requests
  await User.findByIdAndUpdate(userId, {
    $pull: { friendRequests: friendId },
  });

  // the current user id is pulled from the requester's sent requests
  await User.findByIdAndUpdate(friendId, {
    $pull: { sentRequests: userId },
  });

  // Get the most up to date user model for current user and recipient user
  const updatedRecipientUser = await User.findById(friendId)
    .populate("friends")
    .populate("friendRequests")
    .populate("sentRequests");
  const updatedCurrentUser = await User.findById(userId)
    .populate("friends")
    .populate("friendRequests")
    .populate("sentRequests");

  res.status(200).json({
    message: "Friend request rejected",
    userId,
    recipientId: updatedRecipientUser._id,
    currentUser: updatedCurrentUser,
  });
});

// Unfriend someone
exports.unfriend = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const friendUsername = req.params.friendUsername;
  const friend = await User.findOne({ username: friendUsername });
  const friendId = friend._id;

  // the friend's id is pulled from the current user's friends
  await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });

  // the current user id is pulled from the recipient's friends
  await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

  // Get the most up to date user model for current user and recipient user
  const updatedRecipientUser = await User.findById(friendId).populate(
    "friends"
  );
  const updatedCurrentUser = await User.findById(userId).populate("friends");

  res
    .status(200)
    .json({
      message: "Friend removed successfully",
      userId,
      recipientId: updatedRecipientUser._id,
      currentUser: updatedCurrentUser,
    });
});

// Delete own friend request sent
exports.deleteFriendRequest = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const friendUsername = req.params.friendUsername;
  const friend = await User.findOne({ username: friendUsername });
  const friendId = friend._id;

  // the current user id is pulled from the recipient's friend's requests
  await User.findByIdAndUpdate(friendId, {
    $pull: { friendRequests: userId },
  });

  // the friend's id is pull from the current user's sent requests
  await User.findByIdAndUpdate(userId, {
    $pull: { sentRequests: friendId },
  });

  // Get the most up to date user model for current user and recipient user
  const updatedRecipientUser = await User.findById(friendId)
    .populate("friends")
    .populate("friendRequests")
    .populate("sentRequests");
  const updatedCurrentUser = await User.findById(userId)
    .populate("friends")
    .populate("friendRequests")
    .populate("sentRequests");

  res.status(200).json({
    message: "Friend request deleted successfully",
    userId,
    recipientId: updatedRecipientUser._id,
    currentUser: updatedCurrentUser,
  });
});
