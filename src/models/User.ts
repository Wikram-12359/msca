// models/User.ts
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
    phone: { type: String },
    enrolledCourses: [{ type: String }],
    mustChangePassword: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: "user", // ← critical — Better Auth uses "user" not "users"
  }
);

const User = models.User || model("User", UserSchema);
export default User;