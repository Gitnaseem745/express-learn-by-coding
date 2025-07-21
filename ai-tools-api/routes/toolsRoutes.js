const express = require('express');
const { getAllTools, createTool, getById, deleteTool, updateTool } = require('../controllers/toolControllers');
const { validate } = require('../models/Tool');
const toolSchema = require('../validation/toolSchema');
const router = express.Router();

router.get('/', getAllTools);
router.get('/:toolId', getById);
router.post('/', validate(toolSchema), createTool);
router.put('/:toolId', updateTool);
router.delete('/:toolId', deleteTool);

module.exports = router;
