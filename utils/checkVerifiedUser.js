const checkVerifiedUser = (req, res, next) => {

  if (!req.user?.isVerified) {
    return res.status(403).json({
      message: "PLEASE_VERIFY_EMAIL",
    });
  }

  next();
};

module.exports = checkVerifiedUser;
