require("dotenv").config();

const express = require("express");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");

const dev_db_url =
  "mongodb+srv://username:password@cluster0.mw4rw38.mongodb.net/blog-api?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
const mongoDb = process.env.MONGODB_URI_ODINBOOK || dev_db_url;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.status(path.join(_dirname, "public")));

app.use(cors());

app.use("/user", userRouter);
// app.use("/:userId", userIdRouter);

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
  res.render("error");
});

module.exports = app;
