const Comment = require("../modules/posts/commentModel");
const Post = require("../modules/posts/postModel"); 
const shuffleArray = require("./shuffleArray");

const fetchPosts = async (filter, userId) => {
    const posts = await Post
        .find(filter)
        .populate("author", "name username profileImage")

    const shuffledPost = shuffleArray(posts);

    // use Promise.all to resolve async map
    const postsWithCommentCounts = await Promise.all(
        shuffledPost.map(async (post) => {
            const commentCount = await Comment.countDocuments({ postId: post._id });
            const postObj = post.toObject();
            return {
                ...postObj,
                commentCount,
            };
        })
    );

    return {
        totalPosts: posts.length,
        posts: postsWithCommentCounts
    };
};

module.exports = fetchPosts;
