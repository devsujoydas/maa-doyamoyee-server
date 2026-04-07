const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },

    eventDate: { type: Date, required: true },

    upcoming: { type: Boolean, default: true },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔥 auto upcoming
EventSchema.pre("save", function (next) {
  this.upcoming = new Date(this.eventDate) > new Date();
  next();
});

module.exports = mongoose.model("Event", EventSchema);