const {
  getPostsService,
  getPostService,
  createPostService,
  updatePostService,
  deletePostService,
  getCommentsService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
} = require("./postServices");

const getPosts = async (req, res) => {
  try {
    const posts = await getPostsService(req);
    res.status(200).json(posts);
  } catch (err) {
    if (err.message === "INVALID_AUTHOR_ID") {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    if (err.message === "AUTHOR_NOT_FOUND") {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await getPostService(req);
    res.status(200).json(post);
  } catch (err) {
    if (err.message === "POST_NOT_FOUND")
      return res.status(404).json({ message: "Post not found" });
    res.status(500).json({ message: err.message });
  }
};

// POST /posts
const createPost = async (req, res) => {
  try {
    const post = await createPostService(req);
    // Send post directly for frontend convenience
    res.status(201).json(post);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(400).json({ message: err.message || "Failed to create post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await updatePostService(req);
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    if (["POST_NOT_FOUND", "UNAUTHORIZED"].includes(err.message))
      return res.status(400).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const result = await deletePostService(req);
    res.status(200).json(result);
  } catch (err) {
    if (["POST_NOT_FOUND", "UNAUTHORIZED"].includes(err.message))
      return res.status(400).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await getCommentsService(req);
    res.status(200).json(comments);
  } catch (err) {
    if (err.message === "POST_NOT_FOUND")
      return res.status(404).json({ message: "Post not found" });
    res.status(400).json({ message: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    const comment = await createCommentService(req);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await updateCommentService(req);
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const result = await deleteCommentService(req);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
