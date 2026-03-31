const express = require("express");
const router = express.Router();
const {
  requestPasswordReset,
  verifyResetToken,
  resetPassword,
} = require("./passController");

const rateLimit = require("express-rate-limit");

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests, try again later",
});

router.post("/request-reset", resetLimiter, requestPasswordReset);
router.get("/verify-reset-token", verifyResetToken);
router.post("/reset-password", resetPassword);

module.exports = router;
