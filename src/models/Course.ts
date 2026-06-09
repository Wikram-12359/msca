import mongoose, {models, Schema} from "mongoose"


export interface ICourse {
  title: string,
  teacher?: mongoose.Types.ObjectId,  
  cover?: string,
  students: mongoose.Types.ObjectId[],
  _id?: mongoose.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}


const courseSchema = new Schema<ICourse>({
  title:{
    type: String,
    trim: true,
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  cover:{
    type: String,
    default: ""
  },
  students:[{
    type: mongoose.Types.ObjectId,
    ref: "User",
  }],
}, { timestamps: true })



const Course = models?.Course || mongoose.model<ICourse>("Course", courseSchema)

export default Course