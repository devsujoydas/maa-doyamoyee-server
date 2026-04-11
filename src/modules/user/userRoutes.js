const express = require("express");
const router = express.Router();

const isVerifyUser = require("../../middlewares/verifyUser");
const upload = require("../../../utils/multer");
const {
  getUsers,
  getUsersProfile,
  getMyProfile,
  updateProfile,
  deleteProfile,
  uploadProfilePhoto,
  uploadCoverPhoto,
  requestVerifyUser,
  verifyUserToken,
  deleteUserbyAdmin,
  changeUserRoleByAdmin,
} = require("./userController");

const authorizeRoles = require("../../middlewares/authorizeRoles");

// Public
router.get("/", authorizeRoles("admin", "moderator"), getUsers);
router.get("/profile/:userId", getUsersProfile);

// Private
router.get("/profile", isVerifyUser, getMyProfile);
router.put("/profile", isVerifyUser, updateProfile);
router.delete("/profile", isVerifyUser, deleteProfile);

// Verify
router.post("/request", isVerifyUser, requestVerifyUser);
router.get("/verify", isVerifyUser, verifyUserToken);

// Images
router.put(
  "/profile-photo",
  isVerifyUser,
  upload.single("image"),
  uploadProfilePhoto,
);
router.put(
  "/cover-photo",
  isVerifyUser,
  upload.single("image"),
  uploadCoverPhoto,
);

// USER delete by admin
router.delete(
  "/user/:userId",
  authorizeRoles("admin", "moderator"),
  deleteUserbyAdmin,
);
router.patch("/:userId/role", authorizeRoles("admin"), changeUserRoleByAdmin);

module.exports = router;
