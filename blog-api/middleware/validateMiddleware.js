const validatePost = (schema) => async (req, res, next) => {
    try {
        const validatedData = schema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = validatePost;
