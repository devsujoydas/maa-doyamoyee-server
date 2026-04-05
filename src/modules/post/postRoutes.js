const express = require("express");
const router = express.Router();
const isVerifyUser = require("../../middlewares/verifyUser");
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
} = require("./postController");
const upload = require("../../../utils/multer");

// POSTS
router.get("/", getPosts);
router.get("/:postId", getPost); 

router.post("/", isVerifyUser, upload.single("image"), createPost);
router.put("/:postId", isVerifyUser, updatePost);
router.delete("/:postId", isVerifyUser, deletePost);

router.patch("/:postId/react", isVerifyUser, toggleReact);

// COMMENTS
router.get("/:postId/comments", getComments);

router.post("/:postId/comments", isVerifyUser, createComment);
router.put("/:postId/comments/:commentId", isVerifyUser, updateComment);
router.delete("/:postId/comments/:commentId", isVerifyUser, deleteComment);

module.exports = router;
