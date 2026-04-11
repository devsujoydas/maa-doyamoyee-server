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

const deleteUserbyAdminService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("USER_NOT_FOUND");

  if (user.profileImage?.publicId) {
    await deleteImageFromCloudinary(user.profileImage.publicId);
  }

  if (user.coverImage?.publicId) {
    await deleteImageFromCloudinary(user.coverImage.publicId);
  }

  await User.deleteOne({ _id: id });
  await Post.deleteMany({ author: id });
  await Comment.deleteMany({ author: id });

  return {
    message: "User deleted successfully",
  };
};

const changeUserRoleByAdminService = async (userId, newRole) => {
  const validRoles = ["admin", "moderator", "user"];

  if (!validRoles.includes(newRole)) {
    throw { message: "INVALID_ROLE", code: 400 };
  }

  const user = await User.findById(userId);
  if (!user) throw { message: "USER_NOT_FOUND", code: 404 };

  const previousRole = user.role;

  // ❗ same role হলে update না করা
  if (previousRole === newRole) {
    throw { message: "USER_ALREADY_HAS_THIS_ROLE", code: 400 };
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
