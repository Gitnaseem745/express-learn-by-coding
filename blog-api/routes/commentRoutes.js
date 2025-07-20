const express = require('express');
const { getAllComments, addComment, deleteComment } = require('../controllers/commentController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:postId/comments', getAllComments);
router.post('/:postId/comments', auth, addComment);
router.delete('/:postId/comments/:commentId', auth, deleteComment);

module.exports = router;
