import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string(),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is Required")
      .max(50, "Name Should not exceed 50 characters"),
    email: z.email("Invalid Email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password should not exceed 16 characters"),
    confirm: z.string(),
  })
  .refine(
    (data) => {
      data.password === data.confirm;
    },
    {
      message: "Passwords do not match",
      path: ["confirm"],
    }
  );

export type registerProps = z.infer<typeof registerSchema>;
export type loginProps = z.infer<typeof loginSchema>;
