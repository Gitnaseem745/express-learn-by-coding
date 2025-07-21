const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const toolsRoutes = require('./routes/toolsRoutes');

dotenv.config({
    path: './.env'
});
connectDB();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/tools', toolsRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
