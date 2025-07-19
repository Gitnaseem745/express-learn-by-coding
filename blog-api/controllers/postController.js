const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
}

exports.getById = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
}

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, author: req.user });
    res.status(201).json({ message: 'post created' });
}

exports.updatePost = async (req, res) => {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'post updated' });
}

exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'post deleted' });
}
