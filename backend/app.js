require("dotenv").config();

const express = require("express");
const createError = require("http-errors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const connectDB = require("./helpers/mongoConfig");

const userRouter = require("./routes/userRoutes");

const dev_db_url = "";
mongoose.set("strictQuery", false);
const mongoDb = process.env.MONGODB_URI_ODINBOOK || dev_db_url;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
// connectDB();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

require("./helpers/passport");
app.use(passport.initialize());
app.use(passport.session());
// require("./helpers/passport");
app.use(cors());

app.use("/user", userRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
