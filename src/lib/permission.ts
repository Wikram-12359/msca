// lib/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

// Define what resources exist and what actions are possible
const statement = {
  ...defaultStatements,
  course: ["create", "read", "update", "delete", "enroll"],
  user: ["read", "update", "delete", "setRole"],
} as const;

export const ac = createAccessControl(statement);

// admin — full access
export const adminRole = ac.newRole({
  course: ["create", "read", "update", "delete", "enroll"],
  user: ["read", "update", "delete", "setRole"],
});

// teacher — can create and manage their own courses
export const teacherRole = ac.newRole({
  course: ["create", "read", "update", "delete"],
  user: ["read"],
});

// student — can only read and enroll
export const studentRole = ac.newRole({
  course: ["read", "enroll"],
  user: ["read"],
});