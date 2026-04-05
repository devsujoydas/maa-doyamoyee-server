const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    postImg: { type: String, default: "", required: true },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    content: { type: String, default: "", required: true },
    category: { type: String, required: true, trim: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", PostSchema);
