const asyncHandler = require('./asyncHandler');

const validate = (Schema) => asyncHandler((req, res, next) => {
    const validData = Schema.parse(req.body);
    req.body = validData;
    next();
})

module.exports = validate;
