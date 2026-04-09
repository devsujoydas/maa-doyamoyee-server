const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date },
    eventTime: { type: String },
    issuedBy: { type: String },
    venue: { type: String },
    pdfUrl: { type: String },
    pinned: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);