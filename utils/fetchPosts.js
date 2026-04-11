const Comment = require("../modules/posts/commentModel");
const Post = require("../modules/posts/postModel");  

const fetchPosts = async (filter, userId) => {
    const posts = await Post
        .find(filter)
        .populate("author", "name username profileImage")



    // use Promise.all to resolve async map
    const postsWithCommentCounts = await Promise.all(
        posts.map(async (post) => {
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
