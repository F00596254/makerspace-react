const { z } = require('zod');

const passwordSchema = z.string()
.min(8, { message: "Password must be at least 8 characters long" })
.refine(value => /[A-Z]/.test(value), { message: "Password must contain at least one uppercase letter" })
.refine(value => /[a-z]/.test(value), { message: "Password must contain at least one lowercase letter" })
.refine(value => /[0-9]/.test(value), { message: "Password must contain at least one digit" })
.refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), { message: "Password must contain at least one special character" })
.refine(value => !/\s/.test(value), { message: "Password must not contain spaces" });

 
module.exports={passwordSchema}