const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.getAllComments = async (req, res, next) => {
    try {
        const { postId } = req.params;

        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                error: 'Post not found',
                message: 'Cannot retrieve comments for a post that does not exist'
            });
        }

        const comments = await Comment.find({ post: postId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        res.json({
            message: 'Comments retrieved successfully',
            count: comments.length,
            comments: comments
        });
    } catch (error) {
        next(error);
    }
}

exports.addComment = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { comment } = req.body;
        const author = req.user._id;

        // Validate required fields
        if (!comment || !author) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Comment text and author are required'
            });
        }
        console.log("POST ID from params:", postId);

        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                error: 'Post not found',
                message: 'Cannot add comment to a post that does not exist'
            });
        }

        const newComment = await Comment.create({
            comment: comment.trim(),
            author: author,
            post: postId
        });

        const populatedComment = await Comment.findById(newComment._id)
            .populate('author', 'username email');

        res.status(201).json({
            message: 'Comment added successfully',
            comment: populatedComment
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        // Check if comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                error: 'Comment not found',
                message: 'The comment you are trying to delete does not exist or may have already been deleted'
            });
        }

        await Comment.findByIdAndDelete(commentId);

        res.json({
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}
