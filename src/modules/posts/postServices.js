const Post = require("./postModel");
const Comment = require("./commentModel");
const User = require("../users/userModel");
const mongoose = require("mongoose");

const getPostsService = async (req) => {
  const { author, search, status } = req.query;
  const filter = {};

  if (author) {
    if (!mongoose.Types.ObjectId.isValid(author)) {
      throw new Error("INVALID_AUTHOR_ID");
    }

    const validUser = await User.findById(author);
    if (!validUser) {
      throw new Error("AUTHOR_NOT_FOUND");
    }

    filter.author = validUser._id;
  }

  if (status) {
    filter.status = status.toLowerCase();
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const posts = await Post.find(filter)
    .populate("author", "name username profileImage")
    .sort({ createdAt: -1 });

  const postsWithCommentCount = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countDocuments({
        post: post._id,
      });

      return {
        ...post.toObject(),
        commentCount,
      };
    }),
  );

  return {
    total: postsWithCommentCount.length,
    posts: postsWithCommentCount,
  };
};

const getPostService = async (req) => {
  const post = await Post.findById(req.params.postId).populate(
    "author",
    "name username profileImage",
  );

  if (!post) throw new Error("POST_NOT_FOUND");

  const commentCount = await Comment.countDocuments({
    post: req.params.postId,
  });

  const postWithCommentCount = {
    ...post.toObject(),
    commentCount,
  };

  return postWithCommentCount;
};

const createPostService = async (req) => {
  const { title, content, category, postImg } = req.body;
  if (!title || !content || !category) throw new Error("CONTENT_REQUIRED");

  const post = await Post.create({
    title,
    content,
    category,
    postImg: postImg || "",
    author: req.user.id,
  });

  await post.populate("author", "name username profileImage");
  return post;
};

const updatePostService = async (req) => {
  const post = await Post.findById(req.params.postId);
  if (!post) throw new Error("POST_NOT_FOUND");

  if (!post.author.equals(req.user.id)) throw new Error("UNAUTHORIZED");

  const { title, content, category } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (category) post.category = category;

  await post.save();
  return post;
};

const deletePostService = async (req) => {
  const post = await Post.findById(req.params.postId);
  if (!post) throw new Error("POST_NOT_FOUND");

  if (!post.author.equals(req.user.id) && req.user.role !== "admin")
    throw new Error("UNAUTHORIZED");

  await Comment.deleteMany({ post: post._id });
  await Post.findByIdAndDelete(post._id);

  return { message: "Post deleted successfully" };
};

const getCommentsService = async (req) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) throw new Error("POST_NOT_FOUND");

  const comments = await Comment.find({ post: postId })
    .populate("author", "name username profileImage")
    .sort({ createdAt: -1 });

  const commentCount = await Comment.countDocuments({ post: postId });

  return {
    commentCount,
    comments,
  };
};

const createCommentService = async (req) => {
  const { text } = req.body;
  if (!text) throw new Error("TEXT_REQUIRED");

  const comment = await Comment.create({
    text,
    author: req.user.id,
    post: req.params.postId,
  });

  await comment.populate("author", "name username profileImage");
  return { message: "Comment created successfully", comment };
};

const updateCommentService = async (req) => {
  const comment = await Comment.findById(req.params.commentId).populate(
    "author",
    "name username profileImage",
  );
  if (!comment) throw new Error("COMMENT_NOT_FOUND");

  if (!comment.author.equals(req.user.id) && req.user.role !== "admin")
    throw new Error("UNAUTHORIZED");

  comment.text = req.body.text || comment.text;
  await comment.save();

  return { message: "Comment update successfully", comment };
};

const deleteCommentService = async (req) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) throw new Error("COMMENT_NOT_FOUND");

  if (!comment.author.equals(req.user.id) && req.user.role !== "admin")
    throw new Error("UNAUTHORIZED");

  await Comment.findByIdAndDelete(comment._id);
  return { message: "Comment deleted successfully" };
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
};
