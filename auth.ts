import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./utils/authValidations";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    ...authConfig.providers,
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
});
