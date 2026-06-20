import mongoose, {models, Schema} from "mongoose"


export interface ILecture {
  _id?: mongoose.Types.ObjectId,
  name: string,
  link: string
  subject:mongoose.Types.ObjectId, 
  course: mongoose.Types.ObjectId,
}


const lectureSchema = new Schema<ILecture>({
  name:{
    type: String,
    trim: true,
    required: true,
  },
  link:{
    type:String,
    required:true
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
  subject:{
    type: mongoose.Types.ObjectId,
    ref: "Subject",
  }
})



const Lecture = models?.Lecture || mongoose.model<ILecture>("Lecture", lectureSchema)

export default Lecture