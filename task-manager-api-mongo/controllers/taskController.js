const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
    try {
        const { status, from, to } = req.query;
        let filter = {};

        if (status) filter.status = status;

        if (from || to) {
            filter.dueDate = {};
            if (from) filter.dueDate.$gte = new Date(from);
            if (to) filter.dueDate.$lte = new Date(to);
        } 

        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Task not found' });
        res.json(updated);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
