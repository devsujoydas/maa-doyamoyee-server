const User = require("../users/userModel");
const Post = require("../posts/postModel");
const Comment = require("../posts/commentModel");


const deleteUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("USER_NOT_FOUND");

  const userDeleted = await User.findByIdAndDelete(userId);
  const postsDeleted = await Post.deleteMany({ author: userId });
  const commentsDeleted = await Comment.deleteMany({ author: userId });

  return {
    message: "User deleted successfully",
    userDeleted: userDeleted.deletedCount,
    postsDeleted: postsDeleted.deletedCount,
    commentsDeleted: commentsDeleted.deletedCount,
  };
};


const makeAdminService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("USER_NOT_FOUND");

  user.role = "admin";
  await user.save();

  return user;
};

const removeAdminService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("USER_NOT_FOUND");

  user.role = "user";
  await user.save();

  return user;
};

const deletePostAdminService = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("POST_NOT_FOUND");

  const postsDeleted = await Post.deleteMany({ post: postId });
  const commentsDeleted = await Comment.deleteMany({ post: postId });

  return {
    message: "Post deleted by admin",
    postsDeleted: postsDeleted.deletedCount,
    commentsDeleted: commentsDeleted.deletedCount,
  };
};

const deleteCommentAdminService = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("COMMENT_NOT_FOUND");
  
  await Comment.findByIdAndDelete(commentId);

  return {
    message: "Comment deleted by admin", 
  };
};

const updatePostStatusService = async (postId, status) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("POST_NOT_FOUND");

  post.status = status;
  await post.save();

  return post;
};

module.exports = {
  deleteUserService,
  makeAdminService,
  removeAdminService,
  deletePostAdminService,
  updatePostStatusService,
  deleteCommentAdminService,
};
