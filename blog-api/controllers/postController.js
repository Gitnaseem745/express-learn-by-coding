const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author', 'username email');
        res.json({
            message: 'Posts retrieved successfully',
            count: posts.length,
            posts: posts
        });
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id).populate('author', 'username email');

        if (!post) {
            return res.status(404).json({
                error: 'Post not found',
                message: 'The requested post does not exist or may have been deleted'
            });
        }

        res.json({
            message: 'Post retrieved successfully',
            post: post
        });
    } catch (error) {
        next(error);
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        // Validate required fields
        if (!title || !content) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Both title and content are required to create a post'
            });
        }

        const post = await Post.create({
            title: title.trim(),
            content: content.trim(),
            author: req.user._id
        });

        res.status(201).json({
            message: 'Post created successfully',
            post: post
        });
    } catch (error) {
        next(error);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // Check if post exists and user owns it
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return res.status(404).json({
                error: 'Post not found',
                message: 'The post you are trying to update does not exist'
            });
        }

        if (existingPost.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: 'Unauthorized',
                message: 'You can only update your own posts'
            });
        }

        const updated = await Post.findByIdAndUpdate(id, { title, content }, { new: true });

        res.json({
            message: 'Post updated successfully',
            post: updated
        });
    } catch (error) {
        next(error);
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if post exists and user owns it
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return res.status(404).json({
                error: 'Post not found',
                message: 'The post you are trying to delete does not exist or may have already been deleted'
            });
        }

        if (existingPost.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: 'Unauthorized',
                message: 'You can only delete your own posts'
            });
        }

        await Post.findByIdAndDelete(id);

        res.json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}
