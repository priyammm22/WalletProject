const { z } = require('zod');

const userValidation = z.object({
    username: z.string().email().min(3).max(30),
    password: z.string().min(6).max(50),
    firstName: z.string().max(50),
    lastName: z.string().max(50)
});

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})


module.exports = {userValidation ,updateBody};