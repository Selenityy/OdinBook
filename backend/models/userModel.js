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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  about: { type: String, maxLength: 100 },
  profilePic: {
    type: String,
    default: "./public/images/profile-pics/panda-avatar.png",
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "Friends" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "FriendRequests" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

UserSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.firstName && this.lastName) {
    fullname = `${this.firstName} ${this.lastName}`;
  }
  return fullname;
});

module.exports = mongoose.model("User", UserSchema);
