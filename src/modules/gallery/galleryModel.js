const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    img: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    eventDate: { type: Date, default: null },

    // Optional fields
    location: { type: String, trim: true },
    author: { type: String, trim: true, default: "Anonymous" },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    uploadedAt: { type: Date, default: Date.now },

    // SEO
    altText: { type: String, trim: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TempleGallery", GallerySchema);