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
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

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
let actualUser = "";
let actualUserId = "";
let actualPost = "";
let actualPostId = "";
let actualComment = "";
let actualCommentId = "";

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
  const response = await request(app).post("/user/login").send({
    username: "testuser1",
    password: "password123",
  });
  token = response.body.token;
  actualUser = await User.findOne({ username: "testuser1" });
  actualUserId = actualUser._id;

  const postRes = await request(app)
    .post(`/user/${actualUserId}/posts/`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      body: "testuser1's first post",
    });
  actualPost = await Post.findOne({ _id: postRes.body.post._id });
  actualPostId = actualPost._id;

  actualComment = new Comment({
    body: "the first test comment",
    user: actualUserId,
    post: actualPostId,
  });
  actualCommentId = actualComment._id;
  await actualComment.save();

  actualPost = await Post.findById(actualPostId).populate("comments");
});

// Disconnect and stop server after tests
afterAll(async () => {
  await db.stopMongoServer();
});

test("should delete a comment on a post", async () => {
  const res = await request(app)
    .put(
      `/user/${actualUserId}/posts/${actualPostId}/comments/${actualCommentId}`
    )
    .set("Authorization", `Bearer ${token}`)
    .send({ body: "updated testuser1's first comment" });
  expect(res.statusCode).toEqual(200);
  expect(res.body.body).toEqual("updated testuser1's first comment");
});
