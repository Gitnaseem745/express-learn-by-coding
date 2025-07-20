const express = require('express');
const { getAllPosts, getById, createPost, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const validatePost = require('../middleware/validateMiddleware');
const postSchema = require('../validation/validatePost');
const router = express.Router();

router.get('/', auth, getAllPosts);
router.get('/:id', auth, getById);
router.post('/', auth, validatePost(postSchema), createPost);
router.put('/:id', auth, validatePost(postSchema), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
