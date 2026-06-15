// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, adminRole, studentRole, teacherRole } from "./permission";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  fetchOptions:{
    cache: "no-store"
  },
  sessionOptions:{
    refetchOnWindowFocus:false,
  },
  plugins: [adminClient({
     ac,
      roles: { admin: adminRole, teacher: teacherRole, student: studentRole },
  }),
],
});

// Named exports for convenience
export const { signIn, signOut, signUp, useSession } = authClient;