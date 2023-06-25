import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "database";
import passwordHash from "@src/lib/passwordHash";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
