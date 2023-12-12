const asyncHandler = require("express-async-handler");
const { hashPassword } = require("../helpers/bcrypt");
const User = require("../models/userModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Sign up
exports.signup = asyncHandler(async (req, res, next) => {
  const { username, password, email, firstName, lastName } = req.body;
  const isTestUser = testUserCode === process.env.TEST_USER_CODE;

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
  try {
    const user = req.user;
    // create a jwt token
    const body = {
      _id: user._id,
      username: user.username,
      testUser: user.testUser,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      about: user.about,
      profilePic: user.profilePic,
      friends: user.friends,
      friendRequests: user.friendRequests,
      posts: user.posts,
    };
    const token = jwt.sign({ user: body }, process.env.SESSION_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ body, token });
  } catch (err) {
    next(err);
  }
});

// Log out
exports.logout = asyncHandler(async (req, res, next) => {
  // this will be handled on client side for a sessionless state
  res.json({ message: "Logged out" });
});
