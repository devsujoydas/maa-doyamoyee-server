const mongoose = require("mongoose");

// Simple slug generator (Bangla + English safe)
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

const NoticeSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true },
    
    slug: { type: String, unique: true, index: true },
   
    category: {
      type: String,
      enum: ["meeting", "event", "announcement", "general"],
      default: "general",
    },

    eventDate: { type: Date },
    eventTime: { type: String },

    venue: { type: String, trim: true },
    issuedBy: { type: String, trim: true },

    contactPerson: { type: String, trim: true },
    contactPhone: {
      type: String,
      match: [/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"],
    },
    
    isImportant: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    }
  },
  { timestamps: true },
);

// 🔥 Slug auto-generate
NoticeSchema.pre("save", async function () {
  if (!this.isModified("title")) return ;

  let baseSlug = generateSlug(this.title);
  if (!baseSlug) baseSlug = `notice-${Date.now()}`;

  let slug = baseSlug;
  let counter = 1;

  const Notice = mongoose.model("Notice");

  while (await Notice.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;

});

module.exports = mongoose.model("Notice", NoticeSchema);
