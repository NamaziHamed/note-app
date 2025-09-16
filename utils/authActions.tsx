"use server";
import { signIn } from "@/auth";
import { loginProps, registerProps, registerSchema } from "./authValidations";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function register(data: loginProps) {
  const validatedData = registerSchema.parse(data);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed.");
  }

  return res.json();
}
