const {
  deleteUserService,
  makeAdminService,
  removeAdminService,
  deletePostAdminService,
  updatePostStatusService,
  deleteCommentAdminService,
} = require("./adminService");

const deleteUser = async (req, res) => {
  try {
    const result = await deleteUserService(req.params.userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const user = await makeAdminService(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const user = await removeAdminService(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const result = await deletePostAdminService(req.params.postId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const result = await deleteCommentAdminService(req.params.commentId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updatePostStatus = async (req, res) => {
  try {
    const post = await updatePostStatusService(
      req.params.postId,
      req.body.status
    );
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  deleteUser,
  makeAdmin,
  removeAdmin,
  deletePost,
  deleteComment,
  updatePostStatus,
};