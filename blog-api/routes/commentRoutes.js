const express = require('express');
const { getAllComments, addComment, deleteComment } = require('../controllers/commentController');
const router = express.Router();

router.get('/', getAllComments);
router.post('/', addComment);
router.delete('/:commentId', deleteComment);

module.exports = router;
