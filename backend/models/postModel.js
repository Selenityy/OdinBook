const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// if images are needed elsewhere, this schema can be made into it's own model
const ImageSchema = new Schema({
  imageUrl: { type: String },
});

const PostSchema = new Schema({
  body: { type: String, required: true, minLength: 3, maxLength: 200 },
  timestamp: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likeCount: { type: Number, default: 0 },
  images: [ImageSchema],
});

// get comments from a specific post
PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

// get comment count from a specific post
PostSchema.virtual("commentCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
  count: true,
});

module.exports = mongoose.model("Post", PostSchema);
