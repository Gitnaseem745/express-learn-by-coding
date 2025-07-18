const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

dotenv.config({
    path: './.env'
});
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL_AUTH);
        console.log("connected to db");

        app.listen(PORT, () => {
            console.log(`server is started on port: http:localhost:${PORT}`);
        })
    } catch (e) {
        console.log("error while starting the server: ", e);
    }
}

startServer();
