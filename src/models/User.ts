import mongoose, {models, Schema} from "mongoose"
import bcrypt from "bcryptjs"


export interface IUser {
  _id?: mongoose.Types.ObjectId,
  name: string,
  email: string,
  profileImage?: string,
  enrolledCourses?: mongoose.Types.ObjectId[],
  password: string,
  role?: "student" | "admin" | "teacher",
  createdAt?: Date,
  updatedAt?: Date
}


const userSchema = new Schema<IUser>({
  name:{
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  profileImage:{
    type: String,
    default: ""
  },
  enrolledCourses:[{
    type: mongoose.Types.ObjectId,
    ref: "Course",
  }],
  password:{
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum: ["student", "admin", "teacher"],
    default: "student"
  }
}, { timestamps: true })


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 10)
})

const User = models?.User || mongoose.model<IUser>("User", userSchema)

export default User