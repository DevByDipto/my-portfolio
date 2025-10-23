import { NextAuthOptions } from "next-auth";
import { credentialsProvider, googleProvider } from "./providers";
import type { Iuser } from "@/app/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    } 
  }
}


export const authOptions: NextAuthOptions = { // aikahne j NextAuthOptions use kora jai ta bujbo kivabe ?
  providers: [googleProvider, credentialsProvider],

  session: {
    strategy: "jwt", // ✅ better for stateless API
  },

  callbacks: {
    // ✅ signIn callback → runs every login
    async signIn({ user }) {
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/user?email=${user?.email}`);
        const existingUser = await res.json();

        if (!existingUser.data) {
          await fetch(`${process.env.BACKEND_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
        }
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    // ✅ jwt callback → store custom fields in token
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as Iuser).id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    // ✅ session callback → expose token data to client
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login", // ✅ custom login page
  },
};
