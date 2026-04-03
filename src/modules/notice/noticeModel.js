const mongoose = require("mongoose");

const generateSlug = (title) => {
  if (!title) return "";
  return title
    .trim()
    .replace(/\s+/g, "-") 
    .replace(/[^\w\-ঀ-৾]+/g, "")  
    .toLowerCase();
};

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["meeting", "event", "announcement", "general", "donation", "puja"],
      default: "general",
    },
    pdfUrl: { type: String },
    isPinned: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    eventDate: { type: Date },
    eventTime: { type: String },
    issuedBy: { type: String, trim: true },
    venue: { type: String, trim: true },
  },
  { timestamps: true },
);

// Auto-generate slug
NoticeSchema.pre("save", async function () {
  if (!this.isModified("title")) return;

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
  
const Notice = mongoose.model("Notice", NoticeSchema);

module.exports = Notice;