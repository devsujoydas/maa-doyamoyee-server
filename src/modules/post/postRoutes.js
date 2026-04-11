const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getComments,
  createComment,
  updateComment,
  deleteComment,
  toggleReact,
  updatePostStatus,
} = require("./postController");

const isVerifyUser = require("../../middlewares/verifyUser");
const upload = require("../../../utils/multer");
const authorizeRoles = require("../../middlewares/authorizeRoles");

// POSTS
router.get("/", getPosts);
router.get("/:postId", getPost);
router.patch("/:postId/react", isVerifyUser, toggleReact);

router.post("/", authorizeRoles("admin"), upload.single("image"), createPost);
router.put("/:postId", authorizeRoles("admin"), upload.single("image"), updatePost);
router.delete("/:postId", authorizeRoles("admin"), deletePost);



// admin access
router.put("/post/:postId/status", authorizeRoles("admin"), updatePostStatus);




// COMMENTS
router.get("/:postId/comments", getComments);

router.post("/:postId/comments", isVerifyUser, createComment);
router.put("/:postId/comments/:commentId", isVerifyUser, updateComment);
router.delete("/:postId/comments/:commentId", isVerifyUser, deleteComment);

module.exports = router;
