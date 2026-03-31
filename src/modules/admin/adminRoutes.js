const router = require("express").Router(); 
const isAdmin = require("../../middlewares/isAdmin");

const {
  deleteUser,
  makeAdmin,
  removeAdmin,
  deletePost,
  updatePostStatus,
  deleteComment,
} = require("./adminController");

router.delete("/user/:userId", isAdmin, deleteUser);
router.patch("/user/:userId/make-admin", isAdmin, makeAdmin);
router.patch("/user/:userId/remove-admin", isAdmin, removeAdmin);

router.delete("/post/:postId", isAdmin, deletePost);
router.delete("/comment/:commentId", isAdmin, deleteComment);

router.patch("/post/:postId/status", isAdmin, updatePostStatus);

module.exports = router; 