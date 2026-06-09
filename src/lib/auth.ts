import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import CredienialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredienialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials?.name || !credentials?.email || !credentials?.password){
          throw new Error("Missing required fields")
        }
        try{
          await connectDB();
          const user = await User.findOne({ email: credentials.email })

          if (!user) {
            throw new Error("No user found with this email")
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)

          if(!isValid){
            throw new Error("Invalid password")
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
          }

        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Authentication failed")
        }
      },
    })
  ],
  callbacks:{
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages:{
    signIn: "/login",
    error: "/login"
  },
  session:{
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
}