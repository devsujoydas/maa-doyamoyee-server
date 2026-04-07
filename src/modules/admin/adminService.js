const User = require("../user/userModel");
const Post = require("../post/postModel");
const Comment = require("../post/commentModel");

// -------------------- USER --------------------

// DELETE USER
const deleteUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw { message: "USER_NOT_FOUND", code: 404 };

  await User.findByIdAndDelete(userId);
  const postsDeleted = await Post.deleteMany({ author: userId });
  const commentsDeleted = await Comment.deleteMany({ author: userId });

  return {
    message: "User deleted successfully",
    userDeleted: 1,
    postsDeleted: postsDeleted.deletedCount,
    commentsDeleted: commentsDeleted.deletedCount,
  };
};

// MAKE ADMIN
const makeAdminService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw { message: "USER_NOT_FOUND", code: 404 };

  user.role = "admin";
  await user.save();

  return user;
};

// REMOVE ADMIN
const removeAdminService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw { message: "USER_NOT_FOUND", code: 404 };

  user.role = "user";
  await user.save();

  return user;
};

// -------------------- POST --------------------

// DELETE POST
const deletePostAdminService = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) throw { message: "POST_NOT_FOUND", code: 404 };

  await Post.findByIdAndDelete(postId);
  const commentsDeleted = await Comment.deleteMany({ post: postId });

  return {
    message: "Post deleted by admin",
    postDeleted: 1,
    commentsDeleted: commentsDeleted.deletedCount,
  };
};

// -------------------- COMMENT --------------------

// DELETE COMMENT
const deleteCommentAdminService = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw { message: "COMMENT_NOT_FOUND", code: 404 };

  await Comment.findByIdAndDelete(commentId);

  return {
    message: "Comment deleted by admin",
    commentDeleted: 1,
  };
};

module.exports = {
  deleteUserService,
  makeAdminService,
  removeAdminService,
  deletePostAdminService,
  deleteCommentAdminService,
};