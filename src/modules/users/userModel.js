const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // Basic info
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },

    username: { type: String, unique: true, lowercase: true, trim: true },

    // Role
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },

    // Profile
    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dpdsgroa7/image/upload/v1774784662/profile-placeholder-image-gray-silhouette-no-photo_qtc1co.webp",
    },
    coverImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dpdsgroa7/image/upload/v1774784559/placeholder_ayvjp4.webp",
    },

    bio: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },

    // Password reset
    passResetToken: { type: String, default: "" },

    // Refresh token
    refreshToken: { type: String, default: "" },

    // Address info
    addressInfo: {
      address: { type: String, trim: true, default: "" },
      city: { type: String, trim: true, default: "" },
      state: { type: String, trim: true, default: "" },
      postalCode: { type: String, trim: true, default: "" },
      country: { type: String, trim: true, default: "" },
    },
  },
  { timestamps: true },
);

// ---------------------
// Hide sensitive fields when sending response
// ---------------------
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  delete obj.__v;
  return obj;
};

// ---------------------
// Export User Model
// ---------------------
const User = mongoose.model("User", UserSchema);

module.exports = User;
