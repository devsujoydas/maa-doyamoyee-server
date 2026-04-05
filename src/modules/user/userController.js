const { uploadImageToCloudinary } = require("../../../utils/uploadService");
const User = require("./userModel");
const {
  getAllUsersService,
  getMyProfileService,
  updateProfileService,
  deleteProfileService,
  getUsersProfileService,
  requestVerifyUserService,
  verifyUserTokenService,
} = require("./userServices");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await getMyProfileService(req);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "UNAUTHORIZE") {
      return res.status(400).json({ message: "Unauthorized" });
    }
    if (error.message === "USER_NOT_FOUND") {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const getUsersProfile = async (req, res) => {
  try {
    const user = await getUsersProfileService(req);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUsersProfile:", error);

    switch (error.message) {
      case "USER_NOT_FOUND":
        return res.status(404).json({ message: "User not found" });
      case "USERNAME_ALREADY_EXISTS":
        return res.status(404).json({ message: "username already exisits" });

      default:
        return res.status(500).json({ message: "Server error" });
    }
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedUser = await updateProfileService(req);

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    if (error.message === "USERNAME_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "This username already exists",
      });
    }

    if (error.message === "NO_FIELDS_TO_UPDATE") {
      return res.status(400).json({
        message: "No fields provided for update",
      });
    }

    if (error.message === "USER_EMAIL_NOT_FOUND") {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.error("Update user error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const result = await deleteProfileService(req);
    return res.status(200).json({
      message: "Account deleted successfully",
      ...result,
    });
  } catch (error) {
    if (error.message === "EMAIL_REQUIRED") {
      return res.status(400).json({ message: "Email is required" });
    }
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "User not found" });
    }
    console.error("Delete user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = await uploadImageToCloudinary(
      req.file.buffer,
      "profile_photos",
    );

    const user = await User.findById(req.user.id).select(
      "-password -refreshToken -__v",
    );

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.profileImage = imageUrl;

    await user.save();

    res.status(200).json({
      message: "Profile photo updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile photo upload failed" });
  }
};

const uploadCoverPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = await uploadImageToCloudinary(
      req.file.buffer,
      "cover_photos",
    );

    const user = await User.findById(req.user.id).select(
      "-password -refreshToken -__v",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.coverImage = imageUrl;

    await user.save();

    res.status(200).json({
      message: "Cover photo updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cover photo upload failed" });
  }
};

const requestVerifyUserController = async (req, res) => {
  try {
    const { email } = req.body;
    const message = await requestVerifyUserService(email);
    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const verifyUserTokenController = async (req, res) => {
  try {
    const { token } = req.query;
    const message = await verifyUserTokenService(token);
    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getUsers,
  getUsersProfile,
  uploadProfilePhoto,
  uploadCoverPhoto,
  getMyProfile,
  updateProfile,
  deleteProfile,

  requestVerifyUserController,
  verifyUserTokenController,
};
