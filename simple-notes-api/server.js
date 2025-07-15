const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const notesRoutes = require('./routes/notes');

dotenv.config({
    path: path.join(__dirname, '../.env')
});
const app = express();
const PORT = 5001;

app.use(express.json());

app.use('/api/notes', notesRoutes)

app.listen(PORT, () =>   console.log(`Notes API running at http://localhost:${PORT}`));
