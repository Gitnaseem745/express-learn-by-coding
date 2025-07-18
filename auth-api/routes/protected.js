const express = require('express');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', auth, (req, res) => {
    res.json({ message: `Welcome to your dashboard, user ${req.user.id}` });
});

module.exports = router;
