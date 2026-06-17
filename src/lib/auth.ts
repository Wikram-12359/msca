// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin as adminPlugin } from "better-auth/plugins";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { sendResetEmail, sendVerificationEmail } from "./email";
import { ac, adminRole, studentRole, teacherRole } from "./permission";

// Lazily get the raw Mongo client that better-auth needs
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
    await sendResetEmail(user.email, url); // reuse your existing email util
    // or create a separate sendResetPasswordEmail function
  },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendVerificationEmail(user.email, url); // don't await — timing attack
    },
    sendOnSignIn: true, // resend if they try to log in unverified
    autoSignInAfterVerification: true, // sign them in right after clicking link
    
  },
  

  

  // Extend the user object with a role field
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "student",
        input: false, // users can't set their own role on signup
      },
      enrolledCourses:{
        type: "string[]",
        defaultValue: [],
        input: true
      },
      phone: {
        type: "string",
        required: true,
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
    window: 60,   // seconds
    max: 5,       // attempts per window
  },

  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin: adminRole,
        teacher: teacherRole,
        student: studentRole
      },
      // Anyone with role "admin" gets admin powers
      adminRoles: ["admin"],
      defaultRole: "student",
    }),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,     // refresh if older than 1 day
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;