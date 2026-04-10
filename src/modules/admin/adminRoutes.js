const router = require("express").Router();
const authorizeRoles = require("../../middlewares/authorizeRoles"); 

const {
  deleteUser,
  makeAdmin,
  removeAdmin,
  deletePost,
  deleteComment,
} = require("./adminController");

// USER ROUTES
router.delete("/user/:userId", authorizeRoles("admin", "moderator"), deleteUser);

router.patch("/user/:userId/make-admin", authorizeRoles("admin", "moderator"), makeAdmin);
router.patch("/user/:userId/remove-admin", authorizeRoles("admin", "moderator"), removeAdmin);

router.delete("/post/:postId", authorizeRoles("admin", "moderator"), deletePost);

// COMMENT ROUTES
router.delete("/comment/:commentId", authorizeRoles("admin", "moderator"), deleteComment);

module.exports = router;