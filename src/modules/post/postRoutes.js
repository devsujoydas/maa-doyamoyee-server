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

// } = require("./postModel")
// } = require("./commentModel")
// } = require("./postServices")

const isVerifyUser = require("../../middlewares/verifyUser");
const isAdmin = require("../../middlewares/isAdmin");
const upload = require("../../../utils/multer");

// POSTS
router.get("/", getPosts);
router.get("/:postId", getPost);

router.post("/", isAdmin, upload.single("image"), createPost);
router.put("/:postId", isAdmin, upload.single("image"), updatePost);
router.delete("/:postId", isAdmin, deletePost);

router.patch("/:postId/react", isVerifyUser, toggleReact);
router.put("/post/:postId/status", isAdmin, updatePostStatus);

// COMMENTS
router.get("/:postId/comments", getComments);

router.post("/:postId/comments", isVerifyUser, createComment);
router.put("/:postId/comments/:commentId", isVerifyUser, updateComment);
router.delete("/:postId/comments/:commentId", isVerifyUser, deleteComment);

module.exports = router;
