// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin as adminPlugin } from "better-auth/plugins";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { sendResetEmail, sendVerificationEmail } from "./email";
import { ac, adminRole, studentRole, teacherRole } from "./permission";

async function getMongoClient() {
  await connectDB();
  return mongoose.connection.getClient();
}

const client = await getMongoClient();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetEmail(user.email, url);
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendVerificationEmail(user.email, url);
    },
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },

  user: {
    additionalFields: {
      // ❌ removed role — admin plugin owns this via defaultRole
      enrolledCourses: {
        type: "string[]",
        defaultValue: [],
        input: true,
      },
      phone: {
        type: "string",
        required: false, // ❌ was true — breaks Vercel build
      },
    },
  },

  advanced: {
    cookiePrefix: "msca",
    cookies: {
      session_token: {
        attributes: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        },
      },
    },
  },

  rateLimit: {
    enabled: true,
    window: 60,
    max: 5,
  },

  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin: adminRole,
        teacher: teacherRole,
        student: studentRole,
      },
      adminRoles: ["admin"],
      defaultRole: "student",
    }),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
