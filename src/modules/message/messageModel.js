const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },

    email: { type: String, trim: true, required: true },

    phone: { type: String, trim: true },

    message: { type: String, required: true },

    isRead: { type: Boolean, default: false }, // renamed (clean naming)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);