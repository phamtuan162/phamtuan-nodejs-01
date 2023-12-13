import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import NextAuth from "next-auth/next";
export const authOptions = {
  providers: [
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
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
