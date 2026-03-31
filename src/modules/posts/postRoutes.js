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
} = require("./postController");

// POSTS
router.get("/",  getPosts);
router.get("/:postId",  getPost);

router.post("/", isVerifyUser, createPost);
router.put("/:postId", isVerifyUser, updatePost);
router.delete("/:postId", isVerifyUser, deletePost);

// COMMENTS
router.get("/:postId/comments", isVerifyUser, getComments);
router.post("/:postId/comments", isVerifyUser, createComment);
router.put("/:postId/comments/:commentId", isVerifyUser, updateComment);
router.delete("/:postId/comments/:commentId", isVerifyUser, deleteComment);

module.exports = router;
