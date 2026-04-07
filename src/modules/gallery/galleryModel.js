const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },

    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },

    altText: { type: String, default: "" },

    category: {
      type: String,
      enum: ["puja", "festival", "daily", "event", "temple"],
      default: "event",
    },

    status: {
      type: String,
      enum: ["new", "old"],
      default: "new",
    },

    isShow: {
      type: String,
      enum: ["show", "hidden"],
      default: "hidden",
    },

    location: {
      type: String,
      default: "Jamalpur Sri Sri Ri Doyamoyee Temple",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// 🔥 auto altText
GallerySchema.pre("save", function (next) {
  if (!this.altText || !this.altText.trim()) {
    const categoryMap = {
      puja: "Puja ceremony",
      festival: "Festival celebration",
      daily: "Daily temple activity",
      event: "Temple event",
      temple: "Temple",
    };

    this.altText = `${this.title} - ${
      categoryMap[this.category] || "Temple event"
    } at ${this.location}`;
  }
  next();
});

module.exports = mongoose.model("Gallery", GallerySchema);
