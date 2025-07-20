const errorMiddleware = (err, req, res, next) => {
    console.error('Error occurred:', err);

    // Default error response
    let error = {
        status: err.status || 500,
        message: err.message || 'Internal server error occurred'
    };

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        error.status = 400;
        error.message = 'Validation failed. Please check your input data.';
        error.details = Object.values(err.errors).map(val => val.message);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        error.status = 409;
        error.message = 'Duplicate entry found. This data already exists.';
    }

    // Mongoose ObjectId casting error
    if (err.name === 'CastError') {
        error.status = 400;
        error.message = 'Invalid ID format provided';
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error.status = 401;
        error.message = 'Invalid authentication token';
    }

    if (err.name === 'TokenExpiredError') {
        error.status = 401;
        error.message = 'Authentication token has expired';
    }

    res.status(error.status).json({
        error: err.name || 'Unknown Error',
        message: error.message,
    });
}

module.exports = errorMiddleware;
