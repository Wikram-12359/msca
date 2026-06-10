import mongoose, {models, Schema} from "mongoose"


export interface ISubject {
  title: string,
  teacher?: mongoose.Types.ObjectId,  
  _id?: mongoose.Types.ObjectId,
}


const subjectSchema = new Schema<ISubject>({
  title:{
    type: String,
    trim: true,
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true })



const Subject = models?.Subject || mongoose.model<ISubject>("Subject", subjectSchema)

export default Subject