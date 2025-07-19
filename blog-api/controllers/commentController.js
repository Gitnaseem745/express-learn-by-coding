const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
}

exports.addComment = async (req, res) => {
    const comment = await Comment.create(req.body);
    res.status(201).json({ message: 'comment added' });
}

exports.deleteComment = async (req, res) => {
    const deleted = await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'comment deleted' });
}
