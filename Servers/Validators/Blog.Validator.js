// title summary image auther 
const z = require('zod');

const blogValidatorSchema = z.object({
    title: z
        .string({ required_error: "User name is Required" })
        .trim(),

    summary: z
        .string({ required_error: "Summary is required" })
        .trim()
        .min(100, { message: "Summary Should be of atleast 100 Character" })
        .max(200, { message: "Summary Should not be more than 200 Character" }),

    content: z
        .string({ required_error: "Content is required" })
        .trim()
        .min(100, { message: "Content Should be of atleast 100 Character" }),

    auther: z
        .string({ required_error: "auther is Required" })
        .trim(),
});

module.exports = blogValidatorSchema;