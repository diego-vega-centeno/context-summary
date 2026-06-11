import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import bcrypt from "bcryptjs";
import { getUser } from "./lib/data/prs";
import logger from "./lib/logger";
import Google from "next-auth/providers/google";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      authorization: {
        params: {
          scope: "openid profile",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(
              password,
              user.password,
            );
            if (passwordsMatch) return user;
          }
        } catch (error) {
          logger.info("Failed to authenticate");
        }
        return null;
      },
    }),
  ],
});
