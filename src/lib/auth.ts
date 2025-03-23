import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validation";
import { API } from "@/services/axios";

export const authConf: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const { email, password } = await loginSchema.parseAsync(credentials);

        try {
          const res = await API.post("/auth/login", {
            email: email as string,
            password: password as string
          });

          if (res.status === 201) {
            return res.data;
          }

          return null;
        } catch (error) {
          console.log(error);
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }

      return session;
    }
  }
};
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth
} = NextAuth(authConf);
