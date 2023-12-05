const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 30 },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please provide a valid email address",
    },
  },
  password: { type: String, required: true },
  name: { type: String, required: true, message: "First and Last name" },
  about: { type: String },
  profilePic: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: "Friends" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "FriendRequests" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("User", UserSchema);
