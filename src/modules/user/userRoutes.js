const express = require("express");
const router = express.Router();

const isVerifyUser = require("../../middlewares/verifyUser");
const upload = require("../../../utils/multer");
const { getUsers, getUsersProfile, getMyProfile, updateProfile, deleteProfile, uploadProfilePhoto, uploadCoverPhoto, requestVerifyUser, verifyUserToken } = require("./userController");

// Public
router.get("/", getUsers);
router.get("/profile/:userId", getUsersProfile);

// Private
router.get("/profile", isVerifyUser, getMyProfile);
router.put("/profile", isVerifyUser, updateProfile);
router.delete("/profile", isVerifyUser, deleteProfile);

// Images
router.put(
  "/profile-photo",
  isVerifyUser,
  upload.single("image"),
  uploadProfilePhoto
);

router.put(
  "/cover-photo",
  isVerifyUser,
  upload.single("image"),
  uploadCoverPhoto
);

// Verify
router.post("/request", requestVerifyUser);
router.get("/verify", verifyUserToken);

module.exports = router;