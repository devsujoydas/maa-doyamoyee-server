const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    postImg: { type: String, default: "", required: true },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    content: { type: String, default: "", required: true },
    category: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    slug: { type: String, unique: true },
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

// Function to generate slug from title (Bangla + English friendly)
const generateSlug = (title) => {
  if (!title) return "";
  // replace spaces with hyphen and remove unwanted chars except Bangla/English letters and numbers
  return title
    .trim()
    .split("")
    .map(ch => {
      const code = ch.charCodeAt(0);
      // Bangla unicode block 0x0980–0x09FF, basic latin 0x20–0x7E
      if ((code >= 0x0980 && code <= 0x09FF) || (code >= 0x0041 && code <= 0x007A) || (code >= 0x0030 && code <= 0x0039) || ch === " ") {
        return ch === " " ? "-" : ch;
      }
      return "";
    })
    .join("")
    .replace(/-+/g, "-")
    .toLowerCase();
};

// Pre-save hook to generate unique slug
PostSchema.pre("save", async function() {
  if (!this.isModified("title")) return 

  let baseSlug = generateSlug(this.title);
  if (!baseSlug) baseSlug = `post-${Date.now()}`;

  let slug = baseSlug;
  let counter = 1;
  const Post = mongoose.model("Post", PostSchema);

  while (await Post.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

module.exports = mongoose.model("Post", PostSchema);