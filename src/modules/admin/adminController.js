const {
  deleteUserService,
  makeAdminService,
  removeAdminService,
  deletePostAdminService,
  deleteCommentAdminService,
} = require("./adminService");

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const result = await deleteUserService(req.params.userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.code || 400).json({ message: err.message });
  }
};

// MAKE ADMIN
const makeAdmin = async (req, res) => {
  try {
    const user = await makeAdminService(req.params.userId);
    res.status(200).json({
      message: "User promoted to admin",
      user,
    });
  } catch (err) {
    res.status(err.code || 400).json({ message: err.message });
  }
};

// REMOVE ADMIN
const removeAdmin = async (req, res) => {
  try {
    const user = await removeAdminService(req.params.userId);
    res.status(200).json({
      message: "Admin role removed",
      user,
    });
  } catch (err) {
    res.status(err.code || 400).json({ message: err.message });
  }
};

// DELETE POST
const deletePost = async (req, res) => {
  try {
    const result = await deletePostAdminService(req.params.postId);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.code || 400).json({ message: err.message });
  }
};

// DELETE COMMENT
const deleteComment = async (req, res) => {
  try {
    const result = await deleteCommentAdminService(req.params.commentId);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.code || 400).json({ message: err.message });
  }
};

module.exports = {
  deleteUser,
  makeAdmin,
  removeAdmin,
  deletePost,
  deleteComment,
};