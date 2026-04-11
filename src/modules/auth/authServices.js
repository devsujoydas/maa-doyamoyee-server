const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const User = require("../user/userModel"); 
const createTokens = require("../../../utils/createTokens");
const verifyEmailTemplate = require("../../../utils/emailTemplates/verifyEmailTemplate");
const sendEmail = require("../../../utils/sendEmail");

const signUpUserService = async (req, res) => {
  const { name, email, phone, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("USER_ALREADY_EXIST");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword, 
  });

  const username = email.split("@")[0].split("+")[0];
  const { accessToken, refreshToken } = createTokens(res, user);

  user.username = username;
  user.refreshToken = refreshToken;
  await user.save();

  return {
    message: "User registered successfully",
    user,
    accessToken,
  };
};

const signInUserService = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const { accessToken, refreshToken } = createTokens(res, user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    message: "Login successfull",
    user,
    accessToken,
  };
};

const logOutUserService = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("NO_REFRESH_TOKEN");
  }

  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  return true;
};

const refreshAccessTokenService = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token found" });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role ,isVerified: decoded.isVerified},
      process.env.JWT_SECRET,
      { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRESIN}` },
    );
    return res.status(200).json({ accessToken: newAccessToken });
  });
};


const sendVerificationEmailService = async (userId) => {
  if (!userId) throw new Error("USER_NOT_FOUND");

  const user = await User.findById(userId);
  if (!user) throw new Error("USER_NOT_FOUND");

  if (user.isVerified) return "Email already verified";

  const token = jwt.sign({ id: user._id, type: "verify" }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  const verifyUrl = `${process.env.FRONTEND_URL}/profile?token=${token}`;

  await sendEmail(user.email, "Verify Your Email", verifyEmailTemplate(verifyUrl));

  return "Verification email sent";
};
 
const verifyEmailService = async (token) => {
  if (!token) throw new Error("TOKEN_REQUIRED");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new Error("INVALID_OR_EXPIRED_TOKEN");
  }

  if (decoded.type !== "verify") throw new Error("INVALID_TOKEN_TYPE");

  const user = await User.findById(decoded.id);
  if (!user) throw new Error("USER_NOT_FOUND");

  if (user.isVerified) return "Email already verified";

  user.isVerified = true;
  await user.save();

  return "Email verified successfully";
};

module.exports = {
  signUpUserService,
  signInUserService,
  logOutUserService,
  refreshAccessTokenService,
  sendVerificationEmailService,
  verifyEmailService,
};
