const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    username: { type: String, unique: true, lowercase: true, trim: true },

    role: { type: String, enum: ["admin", "user", "moderator"], default: "user" },

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

    passResetToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },

    addressInfo: {
      address: { type: String, trim: true, default: "" },
      city: { type: String, trim: true, default: "" },
      state: { type: String, trim: true, default: "" },
      postalCode: { type: String, trim: true, default: "" },
      country: { type: String, trim: true, default: "" },
    },

    contactDetails: {
      website: { type: String, default: "" },
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      github: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  delete obj.__v;
  return obj;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;