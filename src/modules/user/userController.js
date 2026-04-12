const {
  getUsersService,
  getMyProfileService,
  getUsersProfileService,
  updateProfileService,
  deleteProfileService,
  updateUserImageService,
  requestVerifyUserService,
  verifyUserTokenService,
  deleteUserbyAdminService,
  changeUserRoleByAdminService,
} = require("./userServices");

// ---------------- BASIC ----------------
const getUsers = async (req, res) => {
  try {
    const data = await getUsersService(req);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const data = await getMyProfileService(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUsersProfile = async (req, res) => {
  try {
    const data = await getUsersProfileService(req.params.userId);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = await updateProfileService(req.user.id, req.body);
    res.json({ message: "Profile updated", user: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const data = await deleteProfileService(req.user.id);
    res.json({ message: "Account deleted", ...data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ---------------- IMAGE ----------------
const uploadProfilePhoto = async (req, res) => {
  try {
    const data = await updateUserImageService(
      req.user.id,
      req.file,
      "profileImage",
      "profile_photos",
    );
    res.json({ message: "Profile photo updated", user: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const uploadCoverPhoto = async (req, res) => {
  try {
    const data = await updateUserImageService(
      req.user.id,
      req.file,
      "coverImage",
      "cover_photos",
    );
    res.json({ message: "Cover photo updated", user: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const requestVerifyUser = async (req, res) => {
  try {
    const message = await requestVerifyUserService(req.user.email);
    res.json({ message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const verifyUserToken = async (req, res) => {
  try {
    const message = await verifyUserTokenService(req.query.token);
    res.json({ message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUserbyAdmin = async (req, res) => {
  try {
    const result = await deleteUserbyAdminService(req.params.userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.code || 400).json({ message: err.message });
  }
};

const changeUserRoleByAdmin = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.userId;
    const user = await changeUserRoleByAdminService(req, userId, role);
    res.status(200).json({
      message: `Role changed from ${user.previousRole} to ${user.role}`,
      user,
    });
  } catch (err) {
    res.status(err.code || 400).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getMyProfile,
  getUsersProfile,
  updateProfile,
  deleteProfile,
  uploadProfilePhoto,
  uploadCoverPhoto,
  requestVerifyUser,
  verifyUserToken,
  deleteUserbyAdmin,
  changeUserRoleByAdmin,
};
