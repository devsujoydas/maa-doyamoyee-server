const User = require("../users/userModel");
const { signUpUserService, signInUserService, logOutUserService, refreshAccessTokenService, verifyEmailService, sendVerificationEmailService, } = require("./authServices");



const signUpUser = async (req, res, next) => {  
  try {
    const result = await signUpUserService(req, res, next);
    res.status(201).json(result);
  } catch (error) {
    if (error.message === "USER_ALREADY_EXIST") {
      return res.status(409).json({ message: "User already exists with this emaill" });
    }
    res.status(500).send({ message: error.message });
  }
};


const signInUser = async (req, res) => {
  try {
    const result = await signInUserService(req, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const googleLogin = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    // ✅ Verify firebase token
    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const { email, name, picture, uid } = decoded;

    let user = await User.findOne({ email });

    // ✅ Create user if not exists
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        provider: "google",
        firebaseUid: uid,
      });
    }

    issueToken(res, user);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Google authentication failed" });
  }
};


const logOutUser = async (req, res) => {
  try {
    await logOutUserService(req.cookies?.refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    if (error.message === "NO_REFRESH_TOKEN") {
      return res.status(400).json({ message: "No refresh token found" });
    }

    return res.status(500).json({ message: "Logout failed" });
  }
};

const refreshAccessToken = (req, res) => {
  try {
    const result = refreshAccessTokenService(req, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendVerificationEmail = async (req, res, next) => {
  try {
    const message = await sendVerificationEmailService(req.user?.id);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token;
    const message = await verifyEmailService(token);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUpUser,
  signInUser,
  googleLogin,
  logOutUser,
  refreshAccessToken,
   sendVerificationEmail,
  verifyEmail,
};




