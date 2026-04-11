const express = require("express");
const router = express.Router();
const {
  signUpUser,
  signInUser,
  logOutUser,
  refreshAccessToken,
  googleLogin,
  sendVerificationEmail,
  verifyEmail,
} = require("./authController");

const isVerifyUser = require("../../middlewares/verifyUser");

router.post("/send-verification", isVerifyUser, sendVerificationEmail);
router.get("/verify-email", verifyEmail);

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/logout", isVerifyUser, logOutUser);
router.get("/refresh", refreshAccessToken);

router.post("/google", googleLogin);

module.exports = router;
