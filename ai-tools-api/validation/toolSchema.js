const { z } = require('zod');

const toolSchema = z.object({
    title: z.string()
        .trim()
        .min(3, { message: 'Title must be at least 3 characters long.' })
        .max(120, { message: 'Title must be less than 120 characters.' }),

    description: z.string()
        .trim()
        .min(20, { message: 'Description must be at least 20 characters long.' }),

    tags: z.array(z.string()),

    features: z.array(
        z.object({
            name: z.string(),
            details: z.string()
        })
    ).optional(),

    siteUrl: z
        .url({ message: 'Invalid URL format.' })
        .min(10, { message: 'URL must be at least 10 characters long.' })
});

module.exports = toolSchema;
