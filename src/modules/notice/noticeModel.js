const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["meeting", "event", "announcement", "general", "donation", "puja"],
      default: "general",
    },
    pdfUrl: { type: String, default: "" },
    isPinned: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    eventDate: { type: Date },
    eventTime: { type: String, trim: true },
    issuedBy: { type: String, trim: true },
    venue: { type: String, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

NoticeSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Notice", NoticeSchema);