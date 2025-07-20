const { z } = require('zod');

const postSchema = z.object({
    title: z.string().trim().min(3, { message: 'title must be 3 characters long' }).max(255, { message: 'title must be less than 255 characters' }),
    content: z.string().trim().min(3, { message: 'content must be 3 characters long' }).max(2500, { message: 'content must be less than 2500 characters' }),
});

module.exports = postSchema;
