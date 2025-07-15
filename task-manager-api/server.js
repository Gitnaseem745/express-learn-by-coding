const express = require('express');
const tasksRoutes = require('./routes/tasks');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/tasks', tasksRoutes);

app.listen(PORT, () => { 
    console.log(`app is listening on http://localhost:${PORT}`);
});
