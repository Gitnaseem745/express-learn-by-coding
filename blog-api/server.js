const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config({
    path: './.env'
});
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/posts', postRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);

const startServer = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
    app.listen(PORT, () => {
        console.log("server started");
    });
}

startServer();
