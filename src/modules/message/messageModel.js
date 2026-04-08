const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    repliedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, default: "" },
    message: { type: String, required: true },

    isRead: { type: Boolean, default: false },

    // reply history
    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);