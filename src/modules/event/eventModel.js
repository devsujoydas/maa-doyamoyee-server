const mongoose = require("mongoose");

// 🔥 Simple slug generator (Bangla + English safe)
const generateSlug = (title) => {
  if (!title) return "";
  return title
    .trim()
    .split("")
    .map((ch) => (ch === " " ? "-" : ch))
    .join("")
    .replace(/-+/g, "-")
    .toLowerCase();
};

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    slug: { type: String, unique: true, index: true },

    description: { type: String, required: true },

    image: { type: String },

    eventDate: { type: Date, required: true },

    upcoming: { type: Boolean, default: true }, // auto set hobe
  },
  { timestamps: true }
);

// 🔥 Pre-save hook (slug + upcoming)
EventSchema.pre("save", async function () {
  // 👉 SLUG GENERATE
  if (this.isModified("title")) {
    let baseSlug = generateSlug(this.title);
    if (!baseSlug) baseSlug = `event-${Date.now()}`;

    let slug = baseSlug;
    let counter = 1;

    const Event = mongoose.model("Event");

    while (await Event.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }

  // 👉 UPCOMING LOGIC
  if (this.eventDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(this.eventDate);
    eventDate.setHours(0, 0, 0, 0);

    this.upcoming = eventDate >= today;
  }
});

module.exports = mongoose.model("Event", EventSchema);