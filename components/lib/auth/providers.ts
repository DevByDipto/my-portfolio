import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt, { compare } from "bcrypt";
export const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    // credentials: { email, password }
    if (!credentials?.email || !credentials?.password) return null;
    // console.log("credential have");

    // Example: Prisma DB check
    const res = await fetch(`${process.env.BACKEND_URL}/auth/user?email=${credentials.email}`)
    const user = await res.json()

    if (!user.data) return null;
    // console.log("user exist");

    // Password check (bcrypt)
    const isValid = await compare(credentials.password, user.data.password); // bcrypt compare
    console.log(isValid);

    if (!isValid) return null;
    // console.log("pass valid");

    // If everything OK, return user object
    return {
      id: user.data.id,
      name: user.data.name,
      email: user.data.email,
    };
  },
})