const router = require("express").Router();
const isAdmin = require("../../middlewares/isAdmin");

const {
  deleteUser,
  makeAdmin,
  removeAdmin,
  deletePost,
  deleteComment,
} = require("./adminController");

// USER ROUTES
router.delete("/user/:userId", isAdmin, deleteUser);
router.patch("/user/:userId/make-admin", isAdmin, makeAdmin);
router.patch("/user/:userId/remove-admin", isAdmin, removeAdmin);

// POST ROUTES
router.delete("/post/:postId", isAdmin, deletePost);

// COMMENT ROUTES
router.delete("/comment/:commentId", isAdmin, deleteComment);

module.exports = router;