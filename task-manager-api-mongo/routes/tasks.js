const express = require('express');
const { getAllTasks, createTask, updateTask, deleteTask, getByQuery, getById } = require('../controllers/taskController');

const router = express.Router();

// GET all tasks (with optional filters)
router.get('/', getAllTasks);

// GET task by ID
router.get('/:id', getById);

// POST new task
router.post('/', createTask);

// PUT update task
router.put('/:id', updateTask);

// DELETE task
router.delete('/:id', deleteTask);

module.exports = router;
