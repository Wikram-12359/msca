import mongoose, {models, Schema} from "mongoose"
import bcrypt from "bcryptjs"


export interface IUser {
  email: string,
  password: string,
  _id?: mongoose.Types.ObjectId,
  
}


const userSchema = new Schema<IUser>({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,

  }
})


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 10)
})

const User = models?.User || mongoose.model<IUser>("User", userSchema)

export default User