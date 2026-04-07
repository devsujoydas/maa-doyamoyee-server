const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, default: "" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Optional, in case admin wants to track
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);