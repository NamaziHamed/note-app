"use server";

import { signIn, signOut } from "@/auth";
import { loginProps, registerSchema } from "./authValidations";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function logout() {
  await signOut();
}

export async function signInWithCredentials(data: loginProps) {
  try {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return res;
  } catch (error) {
    if (error instanceof AuthError)
      throw new Error("Invalid email or password");
    throw error;
  }
}

export async function registerWithCredentials(data: loginProps) {
  const validatedData = registerSchema.parse(data);

  const existingUser = await prisma.user.findUnique({
    where: { email: validatedData.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    },
  });

  return { success: true, userId: newUser.id };
}
