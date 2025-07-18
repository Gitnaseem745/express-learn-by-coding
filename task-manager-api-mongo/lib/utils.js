const fs = require('fs');
const path = require('path');

const tasksPath = path.join(__dirname, '../data/tasks.json');

/**
 * @description this is a helper function for fetching tasks from local json file
 */
const readTasks = () => {
    const tasks = fs.readFileSync(tasksPath, 'utf-8');
    return JSON.parse(tasks);
}

/**
 * @description this is a helper function to store new tasks in local json file
 */
const writeTasks = (task) => {
    fs.writeFileSync(tasksPath, JSON.stringify(task, null, 2));
}

/**
 * @description this helper function checks 
 * if the current task matches the user given query or not
 * if it matches it return true
 */
const matchQuery = (task, query) => {
    const q = query.toLowerCase();
    return (
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q) ||
        task.status.toLowerCase().includes(q) ||
        task.dueDate.includes(q)
    );
};


module.exports = { readTasks, writeTasks, matchQuery };
