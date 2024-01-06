import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import email from "next-auth/providers/email";
import { BACKEND_URL } from "./constants";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendToken.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendToken: response,
  };
}

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // Error code passed in query string as ?error=
  },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "email",
          placeholder: "jsmith@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        try {
          const res = await fetch(BACKEND_URL + "/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          const user = await res.json();

          if (res.status === 401) {
            throw new Error("Incorrect email or password");
          }

          if (!user) {
            throw new Error("Error while logging in.");
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  debug: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/web");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      // else if (isLoggedIn) {
      //   // Get User from auth
      //   const user = auth.user;
      //   const slug = user.school?.domain.slug;

      //   return Response.redirect(
      //     new URL("/web/" + slug + "/dashboard", nextUrl)
      //   );
      // }
      return true;
    },

    async jwt({ token, user }: any) {
      if (token.error && user.error) {
        console.log("token.error", token.error);
        console.log("user.error", user.error);

        token = null;
        user = undefined;
        return token;
      }

      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendToken.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ session, token, user }: any) {
      session.user = token.user;
      session.backendToken = token.backendToken;

      // return session;
      return Promise.resolve(session);
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
