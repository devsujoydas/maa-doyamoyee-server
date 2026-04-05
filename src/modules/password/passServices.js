const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../user/userModel");
const { FRONTEND_URL, JWT_SECRET } = require("../../configs/config");
const sendEmail = require("../../../utils/sendEmail");
const passwordResetTemplate = require("../../../utils/emailTemplates/passwordResetTemplate");
const verifyPassResetToken = require("../../../utils/verifyPassResetToken");

const requestPasswordResetService = async (email) => {
  if (!email) throw new Error("EMAIL_REQUIRED");

  const user = await User.findOne({ email }).select("email _id");

  if (!user) {
    return "If an account exists, a reset link has been sent.";
  }

  const token = jwt.sign({ id: user._id, type: "reset" }, JWT_SECRET, {
    expiresIn: "15m",
  });

  const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;

  await sendEmail(
    email,
    "🔐 Reset Your Password - Maa Doyamoyee",
    passwordResetTemplate(resetUrl),
  );

  return "If an account exists, a reset link has been sent.";
};

const verifyResetTokenService = async (req) => {
  const token = req.query.token;
  if (!token) throw new Error("TOKEN_REQUIRED");

  const userId = verifyPassResetToken(token);

  const user = await User.findById(userId);
  if (!user) throw new Error("USER_NOT_FOUND");

  return "Reset link is valid";
};

const resetPasswordService = async (token, newPassword, confirmNewPassword) => {
  console.log(token, newPassword, confirmNewPassword);

  if (!token) throw new Error("TOKEN_REQUIRED");
  if (
    !newPassword ||
    !confirmNewPassword ||
    newPassword !== confirmNewPassword
  ) {
    throw new Error("PASSWORDS_INVALID_OR_MISMATCH");
  }

  const userId = verifyPassResetToken(token);
  const user = await User.findById(userId);
  if (!user) throw new Error("USER_NOT_FOUND");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return "Password reset successful";
};

const changePasswordService = async (req) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  // ✅ Trim all inputs
  const current = currentPassword?.trim();
  const np = newPassword?.trim();
  const confirm = confirmNewPassword?.trim();

  if (!current || !np || !confirm) {
    throw new Error("ALL_FIELDS_REQUIRED");
  }

  if (np !== confirm) {
    throw new Error("PASSWORD_MISMATCH");
  }

  if (np.length < 8) {
    throw new Error("PASSWORD_TOO_SHORT");
  }

  const user = await User.findById(req.user.id);
  if (!user) throw new Error("USER_NOT_FOUND");

  // Check current password
  const isMatch = await bcrypt.compare(current, user.password);
  if (!isMatch) {
    throw new Error("CURRENT_PASSWORD_INCORRECT");
  }

  // Prevent reuse
  const isSame = await bcrypt.compare(np, user.password);
  if (isSame) {
    throw new Error("NEW_PASSWORD_MUST_BE_DIFFERENT");
  }

  // Hash & save
  user.password = await bcrypt.hash(np, 10);
  await user.save();

  return "Password updated successfully";
};

module.exports = {
  requestPasswordResetService,
  verifyResetTokenService,
  resetPasswordService,
  changePasswordService,
};
