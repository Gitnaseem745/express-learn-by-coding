const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readTasks, writeTasks, matchQuery } = require('../lib/utils');

const router = express.Router();

// GET all tasks (with optional status filter)
router.get('/', (req, res) => {
    let tasks = readTasks();
    const { status, from, to } = req.query;

    if (status) {
        tasks = tasks.filter(t => t.status.toLowerCase() === status.toLowerCase());
    }

    if (from) {
        tasks = tasks.filter(t => new Date(t.dueDate) >= new Date(from));
    }

    if (to) {
        tasks = tasks.filter(t => new Date(t.dueDate) <= new Date(to));
    }

    res.json(tasks);
});

// GET task by ID
router.get('/:id', (req, res) => {
    const task = readTasks().find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
});

// POST new task
router.post('/', (req, res) => {
    const { title, description, status = 'pending', dueDate } = req.body;
    const tasks = readTasks();

    const newTask = {
        id: uuidv4(),
        title,
        description,
        status,
        dueDate
    };

    tasks.push(newTask);
    writeTasks(tasks);

    res.json({ message: `New task added successfully`, task: newTask });
});

// PUT update task
router.put('/:id', (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);

    if (index === -1) return res.status(404).json({ message: 'Task not found' });

    tasks[index] = {
        ...tasks[index],
        title: title ?? tasks[index].title,
        description: description ?? tasks[index].description,
        status: status ?? tasks[index].status,
        dueDate: dueDate ?? tasks[index].dueDate
    };

    writeTasks(tasks);
    res.json({ message: `Task updated successfully`, task: tasks[index] });
});

// DELETE task
router.delete('/:id', (req, res) => {
    const tasks = readTasks();
    const filtered = tasks.filter(t => t.id !== req.params.id);
    writeTasks(filtered);
    res.json({ message: `Task deleted successfully` });
});

// GET search by query param
router.get('/search/query', (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Search query required' });

    const matched = readTasks().filter(task => matchQuery(task, q));
    res.json(matched);
});

module.exports = router;
