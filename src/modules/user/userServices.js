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
const { FRONTEND_URL, JWT_SECRET } = require("../../configs/config");

// ---------------- BASIC ----------------
const getUsersService = async (query) => {
  const { search, role } = query;

  const filter = {};

  if (search) {
    filter.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { username: new RegExp(search, "i") },
    ];
  }

  if (role) filter.role = role;

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

  if (body.name) update.name = body.name;
  if (body.bio !== undefined) update.bio = body.bio;

  if (body.username) {
    const exist = await User.findOne({
      username: body.username,
      _id: { $ne: id },
    });
    if (exist) throw new Error("USERNAME_EXISTS");
    update.username = body.username;
  }

  const user = await User.findByIdAndUpdate(id, update, {
    new: true,
  }).select("-password -refreshToken");

  return user;
};

// ---------------- IMAGE ----------------
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

// ---------------- DELETE ----------------
const deleteProfileService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("USER_NOT_FOUND");

  // delete images
  if (user.profileImage?.publicId) {
    await deleteImageFromCloudinary(user.profileImage.publicId);
  }

  if (user.coverImage?.publicId) {
    await deleteImageFromCloudinary(user.coverImage.publicId);
  }

  await User.deleteOne({ _id: id });
  await Post.deleteMany({ author: id });
  await Comment.deleteMany({ author: id });

  return { success: true };
};

// ---------------- VERIFY ----------------
const requestVerifyUserService = async (email) => {
  if (!email) throw new Error("EMAIL_REQUIRED");

  const user = await User.findOne({ email });
  if (!user) return "Verification email sent";

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "1d",
  });

  const link = `${FRONTEND_URL}/verify-email?token=${token}`;

  await sendEmail(email, "Verify Email", verifyEmailTemplate(link));

  return "Verification email sent";
};

const verifyUserTokenService = async (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) throw new Error("USER_NOT_FOUND");

  user.isVerified = true;
  await user.save();

  return "Email verified";
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
};
