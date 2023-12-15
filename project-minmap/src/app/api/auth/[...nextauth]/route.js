import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

import { LoginUser } from "@/utils/LoginUser";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Username:",
          type: "text",
          placeholder: "vui lòng nhập tên tài khoản",
          required: true,
        },
        email: {
          label: "email:",
          type: "text",
          placeholder: "vui lòng nhập email",
          required: true,
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "vui lòng nhập password",
          required: true,
        },
      },
      async authorize(credentials) {
        return await LoginUser(credentials);
      },
    }),
    GitHubProvider({
      clientId: process.env.CLIENT_ID_GITHUB ?? "",
      clientSecret: process.env.CLIENT_SECRET_GITHUB ?? "",
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID_GOOGLE ?? "",
      clientSecret: process.env.CLIENT_SECRET_GOOGLE ?? "",
    }),
    FacebookProvider({
      clientId: process.env.CLIENT_ID_FACEBOOK ?? "",
      clientSecret: process.env.CLIENT_SECRET_FACEBOOK ?? "",
    }),
  ],
  callbacks: {
    jwt({ token, trigger, session, user }) {
      user.info = "Tuấn";
      console.log(user);
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, trigger, user, newSession }) {
      console.log(user);

      if (trigger === "update" && newSession?.name) {
        session.name = newSession.name;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
