import { z } from 'zod';
const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .refine(value => /[A-Z]/.test(value), { message: "Password must contain at least one uppercase letter" })
  .refine(value => /[a-z]/.test(value), { message: "Password must contain at least one lowercase letter" })
  .refine(value => /[0-9]/.test(value), { message: "Password must contain at least one digit" })
  .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), { message: "Password must contain at least one special character" })
  .refine(value => !/\s/.test(value), { message: "Password must not contain spaces" });

// Define schema for the form
export const schema = z.object({
  password: z.string().min(8),
  newPassword: passwordSchema,
  repeatNewPassword: z.string().nonempty({ message: "Repeat new password is required" })
}).refine(data => data.newPassword === data.repeatNewPassword, {
  message: "New password and repeat new password must match",
  path: ['repeatNewPassword'] // This is where the error message will appear
});

export const forgotPassSchema= z.object({
   newPassword : passwordSchema,
   repeatNewPassword: z.string().min(8)
}).refine(data => data.newPassword === data.repeatNewPassword, {
  message: "New password and repeat new password must match",
  path: ['repeatNewPassword'] // This is where the error message will appear
});

// eslint-disable-next-line no-undef
 