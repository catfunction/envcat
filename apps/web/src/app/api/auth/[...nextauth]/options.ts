import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "database";
import passwordHash from "@src/lib/passwordHash";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: "ENVCAT_TOKEN",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: true },
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (checkPassword(user.password, user.salt)) {
          throw new Error("InvalidCredentials");
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
};

const checkPassword = (password: string, salt: string) => {
  const hash = passwordHash(password, salt);

  return password === hash;
};
