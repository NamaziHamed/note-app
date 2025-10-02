"use server";
import { signIn, signOut } from "@/auth";
import { loginProps, registerSchema } from "./authValidations";
import { redirect } from "next/navigation";

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

export async function logout() {
  await signOut();
  redirect("/login");
}
