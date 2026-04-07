const Post =  require("./postModel")
const Comment = require("./commentModel");
const mongoose = require("mongoose");

const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../../../utils/uploadService");

// ---------------- POSTS ----------------
const getPostsService = async (query) => {
  const { author, search, status } = query;
  const filter = {};

  if (author) {
    if (!mongoose.Types.ObjectId.isValid(author)) {
      throw new Error("INVALID_AUTHOR_ID");
    }
    filter.author = author;
  }

  if (status) filter.status = status;

  if (search) {
    filter.$or = [
      { title: new RegExp(search, "i") },
      { content: new RegExp(search, "i") },
    ];
  }

  const posts = await Post.find(filter)
    .populate("author", "name username profileImage")
    .sort({ createdAt: -1 });

  return posts;
};

const getPostService = async (postId) => {
  const post = await Post.findById(postId).populate(
    "author",
    "name username profileImage"
  );

  if (!post) throw new Error("POST_NOT_FOUND");

  return post;
};

const createPostService = async (userId, body, file) => {
  const { title, content, category } = body;

  if (!title || !content || !category) {
    throw new Error("ALL_FIELDS_REQUIRED");
  }

  let image = { url: "", publicId: "" };

  if (file) {
    const result = await uploadImageToCloudinary(file.buffer, "posts");
    image = result;
  }

  const post = await Post.create({
    title,
    content,
    category,
    postImg: image,
    author: userId,
  });

  return post;
};

const updatePostService = async (user, postId, body, file) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("POST_NOT_FOUND");

  if (!post.author.equals(user.id)) throw new Error("UNAUTHORIZED");

  // text update
  if (body.title) post.title = body.title;
  if (body.content) post.content = body.content;
  if (body.category) post.category = body.category;

  // image replace
  if (file) {
    if (post.postImg?.publicId) {
      await deleteImageFromCloudinary(post.postImg.publicId);
    }

    const result = await uploadImageToCloudinary(file.buffer, "posts");
    post.postImg = result;
  }

  await post.save();
  return post;
};

const deletePostService = async (user, postId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("POST_NOT_FOUND");

  if (!post.author.equals(user.id) && user.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }

  // delete image
  if (post.postImg?.publicId) {
    await deleteImageFromCloudinary(post.postImg.publicId);
  }

  await Comment.deleteMany({ post: post._id });
  await Post.findByIdAndDelete(post._id);

  return { message: "Post deleted" };
};

// ---------------- COMMENTS ----------------
const getCommentsService = async (postId) => {
  return await Comment.find({ post: postId })
    .populate("author", "name username profileImage")
    .sort({ createdAt: -1 });
};

const createCommentService = async (userId, postId, text) => {
  if (!text) throw new Error("TEXT_REQUIRED");

  return await Comment.create({
    text,
    author: userId,
    post: postId,
  });
};

const updateCommentService = async (user, commentId, text) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("COMMENT_NOT_FOUND");

  if (!comment.author.equals(user.id) && user.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }

  comment.text = text || comment.text;
  await comment.save();

  return comment;
};

const deleteCommentService = async (user, commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("COMMENT_NOT_FOUND");

  if (!comment.author.equals(user.id) && user.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }

  await comment.deleteOne();
  return { message: "Comment deleted" };
};

// ---------------- REACT ----------------
const toggleReactService = async (userId, postId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("POST_NOT_FOUND");

  const exists = post.reacts.includes(userId);

  if (exists) {
    post.reacts.pull(userId);
  } else {
    post.reacts.addToSet(userId);
  }

  await post.save();
  return post;
};

// ---------------- STATUS ----------------
const updatePostStatusService = async (postId, status) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("POST_NOT_FOUND");

  post.status = status;
  await post.save();

  return post;
};

module.exports = {
  getPostsService,
  getPostService,
  createPostService,
  updatePostService,
  deletePostService,
  getCommentsService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
  toggleReactService,
  updatePostStatusService,
};