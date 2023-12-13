import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth/next";
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENT_ID_GITHUB,
      clientSecret: process.env.CLIENT_SECRET_GITHUB,
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID_GOOGLE ?? "",
      clientSecret: process.env.CLIENT_SECRET_GOOGLE ?? "",
    }),
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
        const response = await fetch(
          `https://api-social-psi.vercel.app/api/v1/auth/login `,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        const data = await response.json();
        if (data.code === 400) {
          if (data.message === "Tài khoản không tồn tại") {
            const response = await fetch(
              `https://api-social-psi.vercel.app/api/v1/auth/register `,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
              }
            );
            const data = await response.json();
            if (data.code === 201) {
              return credentials;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          return data.data;
        }
      },
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
