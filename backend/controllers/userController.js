const asyncHandler = require("express-async-handler");
const { hashPassword } = require("../helpers/bcrypt");
const User = require("../models/userModel");

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
