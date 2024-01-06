import NextAuth from "next-auth/next";
import type { School } from "./entities";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      lastLogin: string;
      schoolId: string;
      signUpDate: string;
      school?: School;
    };
    backendToken: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
    };

    backendToken: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
