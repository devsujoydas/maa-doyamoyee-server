const Post = require("./postModel");
const Comment = require("./commentModel");
const mongoose = require("mongoose");

const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../../../utils/uploadService");
const commentModel = require("./commentModel");

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

  // 👇 same logic as single post
  const postsWithCount = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await commentModel.countDocuments({
        post: post.id,
      });

      return {
        ...post.toObject(),
        commentCount,
      };
    }),
  );

  return postsWithCount;
};

const getPostService = async (postId) => {
  const post = await Post.findById(postId).populate(
    "author",
    "name username profileImage",
  );

  if (!post) throw new Error("POST_NOT_FOUND");

  const commentCount = await commentModel.countDocuments({ post: postId });

  return {
    ...post.toObject(),
    commentCount,
  };
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

  if (body.title) post.title = body.title;
  if (body.content) post.content = body.content;
  if (body.category) post.category = body.category;

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


const getCommentsService = async (postId) => {
  return await Comment.find({ post: postId })
    .populate("author", "name username profileImage")
    .sort({ createdAt: -1 });
};

const createCommentService = async (userId, postId, text) => {
  if (!text) throw new Error("TEXT_REQUIRED");

  const comment = await Comment.create({
    text,
    author: userId,
    post: postId,
  });

  const populatedComment = await Comment.findById(comment._id).populate(
    "author",
    "name username profileImage",
  );

  return populatedComment;
};

const updateCommentService = async (user, commentId, text) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("COMMENT_NOT_FOUND");

  if (!comment.author.equals(user.id) && user.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }

  comment.text = text || comment.text;
  await comment.save();

  await comment.populate("author", "name username profileImage");

  return comment;
};

const deleteCommentService = async (user, commentId) => {
  let filter = { _id: commentId };
 
  if (user.role !== "admin") {
    filter.author = user.id;
  }

  const deletedComment = await Comment.findOneAndDelete(filter);

  if (!deletedComment) {
    throw new Error("COMMENT_NOT_FOUND_OR_UNAUTHORIZED");
  }

  return {
    message: "Comment deleted successfully",
  };
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




// ---------------- COMMENTS ----------------
const getAllCommentsService = async (query) => {
  const { search = "" } = query;

  let filter = {};

  // 🔍 Search
  if (search) {
    filter.$or = [
      { message: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }


  return await Comment.find(filter)
    .populate("author", "name username profileImage")
    .sort({ createdAt: -1 });
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
  getAllCommentsService,
};
