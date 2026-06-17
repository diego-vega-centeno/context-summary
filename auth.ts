import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import bcrypt from "bcryptjs";
import { createUser, getUser, getOauthUser } from "./lib/data/user";
import logger from "./lib/logger";
import Google from "next-auth/providers/google";

export const { auth, signIn, signOut, handlers, unstable_update } = NextAuth({
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
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const googleId = profile?.sub;
        try {
          const oauthUser = await getOauthUser(googleId!);
          if (!oauthUser) {
            await createUser({
              name: user.name!,
              oauth_id: googleId!,
              oauth_provider: "google",
            });
          }
        } catch (error) {
          logger.error("Error creating Google user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, trigger, session, user, account, profile }) {
      if (user) {
        let dbUser;
        if (account?.provider === "google") {
          dbUser = await getOauthUser(profile?.sub!);
        } else {
          dbUser = await getUser(user.email!);
        }
        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      if (trigger === "update" && session?.user?.name) {
        token.name = session.user.name;
      }
      return token;
    },
  },
});
