import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./utils/authValidations";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {},
      async authorize(credentials) {
        try {
          const validData = loginSchema.safeParse(credentials);
          if (!validData.success) return null;
          const { email, password } = validData.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user || !user.password) return null;
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) return null;
          return user;
        } catch (err) {
          console.error("Authorization Error", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.userId = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});
