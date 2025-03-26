import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.username,
          },
        });
        if (!user) {
          return null;
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        return isValid ? user : null;
      },
    }),
  ],
  pages: {
    signIn: "/api/auth/signin",
    newUser: "/api/auth/newuser",
  },
});

export { handler as GET, handler as POST };
