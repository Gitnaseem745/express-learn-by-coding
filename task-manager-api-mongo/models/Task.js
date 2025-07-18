const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    dueDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
