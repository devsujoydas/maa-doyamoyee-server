const verifyEmailTemplate = require("../../../utils/emailTemplates/verifyEmailTemplate");
const sendEmail = require("../../../utils/sendEmail");
const shuffleArray = require("../../../utils/shuffleArray");
const verifyPassResetToken = require("../../../utils/verifyPassResetToken");
const { FRONTEND_URL, JWT_SECRET } = require("../../configs/config");
const Comment = require("../post/commentModel");
const Post = require("../post/postModel");
const User = require("./userModel");
const jwt = require("jsonwebtoken");

const getAllUsersService = async (req) => {
  const { search, role, status } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (role) filter.role = role;
  if (status) filter.status = status;

  const users = await User.find(filter).select("-password -refreshToken");

  return users;
};

const getMyProfileService = async (req) => {
  if (!req.user?.id) throw new Error("UNAUTHORIZE");

  const user = await User.findById(req.user.id).select("-password -refreshToken");

  if (!user) throw new Error("USER_NOT_FOUND");

  return user;
};

const getUsersProfileService = async (req) => {
  if (!req.params?.userId) throw new Error("UNAUTHORIZE");

  const user = await User.findById(req.params.userId).select(
    "-refreshToken -password",
  );

  if (!user) throw new Error("USER_NOT_FOUND");

  return user;
};

const updateProfileService = async (req) => {
  const { name, username, bio, phone, addressInfo, contactDetails } = req.body;

  const id = req.user?.id;
  if (!id) {
    throw new Error("USER_NOT_FOUND");
  }

  const updateFields = {};

  // ✅ Name
  if (name?.trim()) {
    updateFields.name = name.trim();
  }

  // ✅ Username (unique check)
  if (username?.trim()) {
    const exist = await User.findOne({
      username: username.toLowerCase(),
      _id: { $ne: id },
    });
    if (exist) throw new Error("USERNAME_ALREADY_EXISTS");
    updateFields.username = username.toLowerCase().trim();
  }

  if (bio !== undefined) {
    updateFields.bio = bio;
  }
  if (phone !== undefined) {
    updateFields.phone = phone;
  }

  // ✅ Address Info (nested object)
  if (addressInfo && typeof addressInfo === "object") {
    Object.entries(addressInfo).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        updateFields[`addressInfo.${key}`] = value;
      }
    });
  }
  if (contactDetails && typeof contactDetails === "object") {
    Object.entries(contactDetails).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        updateFields[`contactDetails.${key}`] = value;
      }
    });
  }

  // ❌ Nothing to update
  if (Object.keys(updateFields).length === 0) {
    throw new Error("NO_FIELDS_TO_UPDATE");
  }

  // ✅ Update user
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updateFields },
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).select("-password -refreshToken -__v");

  if (!updatedUser) {
    throw new Error("USER_NOT_FOUND");
  }

  return updatedUser;
};

const deleteProfileService = async (req) => {
  const id = req.user.id;

  const user = await User.findById(id);
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const userDeleted = await User.deleteOne({ _id: id });
  const postsDeleted = await Post.deleteMany({ author: id });
  const commentsDeleted = await Comment.deleteMany({ author: id });

  return {
    userDeleted: userDeleted.deletedCount,
    postsDeleted: postsDeleted.deletedCount,
    commentsDeleted: commentsDeleted.deletedCount,
  };
};

const requestVerifyUserService = async (email) => {
  if (!email) throw new Error("EMAIL_REQUIRED");

  const user = await User.findOne({ email }).select("_id email");

  const message = "Email Verification link has been sent to your email.";

  if (!user) return message;

  const token = jwt.sign({ id: user._id, type: "verify" }, JWT_SECRET, {
    expiresIn: "24h",
  });

  const verifyUrl = `${FRONTEND_URL}/verify-email?token=${token}`;

  await sendEmail(
    email,
    "🔐 Verify Your Email - Maa Doyamoyee",
    verifyEmailTemplate(verifyUrl),
  );

  return message;
};

/**
 * Verify user token
 */
const verifyUserTokenService = async (token) => {
  if (!token) throw new Error("TOKEN_REQUIRED");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("INVALID_OR_EXPIRED_TOKEN");
  }

  if (payload.type !== "verify") throw new Error("INVALID_TOKEN_TYPE");

  const user = await User.findById(payload.id);
  if (!user) throw new Error("USER_NOT_FOUND");

  if (user.isVerified) return "Your email is already verified.";

  user.isVerified = true;
  await user.save();

  return "Your email has been successfully verified!";
};

module.exports = {
  getAllUsersService,
  getUsersProfileService,

  getMyProfileService,
  updateProfileService,
  deleteProfileService,

  requestVerifyUserService,
  verifyUserTokenService,
};
