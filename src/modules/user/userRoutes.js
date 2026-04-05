const express = require("express");
const router = express.Router();

const {
  getUsers,
  getMyProfile,
  updateProfile,
  deleteProfile,
  getUsersProfile,
  uploadProfilePhoto,
  uploadCoverPhoto,
  requestVerifyUserController,
  verifyUserTokenController,
} = require("./userController");
const isVerifyUser = require("../../middlewares/verifyUser");
const upload = require("../../../utils/multer");

router.get("/", isVerifyUser, getUsers);
router.get("/profile", isVerifyUser, getMyProfile);
router.get("/profile/:userId", isVerifyUser, getUsersProfile);

router.put("/profile", isVerifyUser, updateProfile);
router.delete("/profile", isVerifyUser, deleteProfile);

// Profile photo
router.put(
  "/profile-photo",
  isVerifyUser,
  upload.single("image"),
  uploadProfilePhoto,
);

// Cover photo
router.put(
  "/cover-photo",
  isVerifyUser,
  upload.single("image"),
  uploadCoverPhoto,
);



router.post("/request", requestVerifyUserController);

// GET → verify token from link
router.get("/verify", verifyUserTokenController);


module.exports = router;
