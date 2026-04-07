const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    postImg: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },

    title: { type: String, required: true, trim: true, maxlength: 150 },
    content: { type: String, required: true },
    category: { type: String, required: true },

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
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);