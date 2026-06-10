import mongoose, {models, Schema} from "mongoose"


export interface ICourse {
  title: string,
  teachers?: mongoose.Types.ObjectId[],  
  cover?: string,
  students: mongoose.Types.ObjectId[],
  active: boolean,
  subjects:mongoose.Types.ObjectId[], 
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
  teachers: [{
    type: mongoose.Types.ObjectId,
    ref: "User",
  }],
  cover:{
    type: String,
    default: ""
  },
  students:[{
    type: mongoose.Types.ObjectId,
    ref: "User",
  }],
  subjects: [{
    type: mongoose.Types.ObjectId,
    ref: "Subject",
  }],
  active:{
    type: Boolean,
    default: false
  }
}, { timestamps: true })



const Course = models?.Course || mongoose.model<ICourse>("Course", courseSchema)

export default Course