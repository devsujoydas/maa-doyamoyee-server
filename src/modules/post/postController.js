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
  toggleReactService,
  updatePostStatusService,
  getAllCommentsService,
} = require("./postServices");

// POSTS
const getPosts = async (req, res) => {
  try {
    const data = await getPostsService(req.query);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const data = await getPostService(req.params.postId);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const data = await createPostService(req.user.id, req.body, req.file);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const data = await updatePostService(
      req.user,
      req.params.postId,
      req.body,
      req.file,
    );
    res.json({ message: "Post updated", post: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const data = await deletePostService(req.user, req.params.postId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




// COMMENTS
const getAllComments = async (req, res) => {
  try {
    const data = await getAllCommentsService(req.query);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


const getComments = async (req, res) => {
  try {
    const data = await getCommentsService(req.params.postId);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    const data = await createCommentService(
      req.user.id,
      req.params.postId,
      req.body.text,
    );
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await updateCommentService(
      req.user,
      req.params.commentId,
      req.body.text,
    );
    res.status(200).json({
      message: "Comment updated successfully",
      comment 
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const data = await deleteCommentService(req.user, req.params.commentId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// REACT
const toggleReact = async (req, res) => {
  try {
    const data = await toggleReactService(req.user.id, req.params.postId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// STATUS
const updatePostStatus = async (req, res) => {
  try {
    const data = await updatePostStatusService(
      req.params.postId,
      req.body.status,
    );
    res.json(data);
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
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  toggleReact,
  updatePostStatus,
};
