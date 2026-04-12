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

router.post("/", authorizeRoles("ceo"), upload.single("image"), createPost);
router.put("/:postId", authorizeRoles("ceo"), upload.single("image"), updatePost);
router.delete("/:postId", authorizeRoles("ceo"), deletePost);



router.put("/post/:postId/status", authorizeRoles("ceo"), updatePostStatus);




// COMMENTS
router.get("/:postId/comments", getComments);

router.post("/:postId/comments", isVerifyUser, createComment);
router.put("/:postId/comments/:commentId", isVerifyUser, updateComment);
router.delete("/:postId/comments/:commentId", isVerifyUser, deleteComment);

module.exports = router;
