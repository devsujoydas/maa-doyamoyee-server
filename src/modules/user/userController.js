const {
  getUsersService,
  getMyProfileService,
  getUsersProfileService,
  updateProfileService,
  deleteProfileService,
  updateUserImageService,
  requestVerifyUserService,
  verifyUserTokenService,
} = require("./userServices");

// ---------------- BASIC ----------------
const getUsers = async (req, res) => {
  try {
    const data = await getUsersService(req.query);
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

// ---------------- VERIFY ----------------
const requestVerifyUser = async (req, res) => {
  try {
    const message = await requestVerifyUserService(req.body.email);
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
};
