require("dotenv").config();
const userRouter = require("../routes/userRoutes");
const request = require("supertest");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const db = require("../helpers/mongoConfigTesting");
const User = require("../models/userModel");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
require("../helpers/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/user", userRouter);

let token = "";
let userId = "";
let friendUsername = "";
let friendUserId = "";
let user = "";

// Set up MongoDB in-memory server
beforeAll(() => {
  db.initializeMongoServer();
});

beforeEach(async () => {
  await db.clearMongoServer();
  await request(app).post("/user/signup").send({
    username: "testuser1",
    password: "password123",
    email: "test1@example.com",
    firstName: "Test",
    lastName: "User",
  });
  await request(app).post("/user/signup").send({
    username: "testuser2",
    password: "password1234",
    email: "test2@example.com",
    firstName: "Test2",
    lastName: "User2",
  });

  const response = await request(app).post("/user/login").send({
    username: "testuser1",
    password: "password123",
  });
  token = response.body.token;
  user = await User.findOne({ username: "testuser1" });
  userId = user._id;

  const friend2 = await User.findOne({ username: "testuser2" });
  friendUsername = friend2.username;
  friendUserId = friend2._id;
  await request(app).post(
    `/user/${userId}/sendFriendRequest/${friendUsername}`
  );
});

// Disconnect and stop server after tests
afterAll(async () => {
  await db.stopMongoServer();
});

test("should get pending friend requests", async () => {
  console.log(user.friendRequests);
  const newUser = await User.findOne({ username: "testuser2" });
  const newUserId = newUser._id;
  const res = await request(app)
    .get(`/user/${newUserId}/pendingFriendRequests`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  const updatedUser = await User.findOne({ username: "testuser2" });
  expect(updatedUser.friendRequests).toEqual(
    expect.arrayContaining([expect.objectContaining({ _id: userId })])
  );
});
