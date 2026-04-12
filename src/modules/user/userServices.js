const User = require("./userModel");
const Post = require("../post/postModel");
const Comment = require("../post/commentModel");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../../../utils/uploadService");

const jwt = require("jsonwebtoken");
const sendEmail = require("../../../utils/sendEmail");
const verifyEmailTemplate = require("../../../utils/emailTemplates/verifyEmailTemplate");
const deleteUserAssets = require("../../../utils/deleteUserAssets");

// ---------------- BASIC ----------------
const getUsersService = async (req) => {
  const { search, role } = req.query;

  const filter = {};

  // 🔍 Search
  if (search) {
    filter.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { username: new RegExp(search, "i") },
    ];
  }

  // 🔐 Role restriction
  if (req.user.role === "admin") {
    filter.role = { $ne: "ceo" };
  }

  // 🎯 Role filter (only if allowed)
  if (role) {
    if (req.user.role === "admin" && role === "ceo") {
      throw new Error("Forbidden"); // extra protection
    }
    filter.role = role;
  }

  return await User.find(filter).select("-password -refreshToken");
};

const getMyProfileService = async (id) => {
  if (!id) throw new Error("UNAUTHORIZED");

  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) throw new Error("USER_NOT_FOUND");

  return user;
};

const getUsersProfileService = async (id) => {
  const user = await User.findById(id).select("-password -refreshToken");
  if (!user) throw new Error("USER_NOT_FOUND");
  return user;
};

const updateProfileService = async (id, body) => {
  const update = {};

  // basic
  if (body.name) update.name = body.name;
  if (body.bio !== undefined) update.bio = body.bio;
  if (body.phone) update.phone = body.phone;

  // username check
  if (body.username) {
    const exist = await User.findOne({
      username: body.username,
      _id: { $ne: id },
    });

    if (exist) throw new Error("USERNAME_EXISTS");

    update.username = body.username;
  }

  // nested objects (IMPORTANT FIX)
  if (body.addressInfo) {
    update.addressInfo = {
      address: body.addressInfo.address || "",
      city: body.addressInfo.city || "",
      state: body.addressInfo.state || "",
      postalCode: body.addressInfo.postalCode || "",
      country: body.addressInfo.country || "",
    };
  }

  if (body.contactDetails) {
    update.contactDetails = {
      website: body.contactDetails.website || "",
      facebook: body.contactDetails.facebook || "",
      instagram: body.contactDetails.instagram || "",
      youtube: body.contactDetails.youtube || "",
      github: body.contactDetails.github || "",
    };
  }

  const user = await User.findByIdAndUpdate(id, update, {
    returnDocument: "after",
  }).select("-password -refreshToken");

  return user;
};

const updateUserImageService = async (userId, file, field, folder) => {
  if (!file) throw new Error("NO_FILE");

  const user = await User.findById(userId);
  if (!user) throw new Error("USER_NOT_FOUND");

  // delete old
  if (user[field]?.publicId) {
    await deleteImageFromCloudinary(user[field].publicId);
  }

  // upload new
  const result = await uploadImageToCloudinary(file.buffer, folder);

  user[field] = {
    url: result.url,
    publicId: result.publicId,
  };

  await user.save();

  return user;
};

const deleteProfileService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("USER_NOT_FOUND");

 
  await deleteUserAssets(user);

  await Promise.all([
    Post.deleteMany({ author: id }),
    Comment.deleteMany({ author: id }),
  ]);

  await User.findByIdAndDelete(id);

  return {
    success: true,
    message: "Profile deleted successfully",
  };
};

const deleteUserbyAdminService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("USER_NOT_FOUND");

  await deleteUserAssets(user);

  await Promise.all([
    Post.deleteMany({ author: id }),
    Comment.deleteMany({ author: id }),
    User.deleteOne({ _id: id }),
  ]);

  return {
    success: true,
    message: "User deleted successfully",
  };
};

const requestVerifyUserService = async (email) => {
  if (!email) throw new Error("EMAIL_REQUIRED");

  const user = await User.findOne({ email });
  if (!user) return "Verification email sent";

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const link = `${process.env.FRONTEND_URL}/profile?token=${token}`;

  await sendEmail(email, "Verify Email", verifyEmailTemplate(link));

  return "Verification email sent";
};

const verifyUserTokenService = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) throw new Error("USER_NOT_FOUND");

  user.isVerified = true;
  await user.save();

  return "Email verified";
};

const changeUserRoleByAdminService = async (req, userId, newRole) => {
  const validRoles = ["admin", "ceo", "user"];

  if (!validRoles.includes(newRole)) {
    throw { message: "INVALID_ROLE", code: 400 };
  }

  const currentUser = req.user;

  // ❌ user cannot change role
  if (currentUser.role === "user") {
    throw { message: "FORBIDDEN", code: 403 };
  }

  const user = await User.findById(userId);
  if (!user) throw { message: "USER_NOT_FOUND", code: 404 };

  const previousRole = user.role;

  // ❗ same role হলে update না করা
  if (previousRole === newRole) {
    throw { message: "USER_ALREADY_HAS_THIS_ROLE", code: 400 };
  }

  // ❌ admin cannot assign CEO role
  if (currentUser.role === "admin" && newRole === "ceo") {
    throw { message: "ADMIN_CANNOT_ASSIGN_CEO", code: 403 };
  }

  user.role = newRole;
  await user.save();

  return {
    ...user.toObject(),
    previousRole,
  };
};

module.exports = {
  getUsersService,
  getMyProfileService,
  getUsersProfileService,
  updateProfileService,
  deleteProfileService,
  updateUserImageService,
  requestVerifyUserService,
  verifyUserTokenService,
  deleteUserbyAdminService,
  changeUserRoleByAdminService,
};
