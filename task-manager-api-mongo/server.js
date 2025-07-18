const express = require('express');
const tasksRoutes = require('./routes/tasks');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({
    path: './task-manager-api-mongo/.env'
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/tasks', tasksRoutes);

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => { 
            console.log(`app is listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
