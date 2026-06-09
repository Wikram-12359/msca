import mongoose, {models, Schema} from "mongoose"


export interface IMCQ {
  _id?: mongoose.Types.ObjectId,
  question: string,
  options: string[],
  correctAnswer: string,
  courseId: mongoose.Types.ObjectId,
  testId?: mongoose.Types.ObjectId,
}


const MCQSchema = new Schema<IMCQ>({
  question:{
    type: String,
    trim: true,
    required: true,
  },
  options:[{
    type: String,
    required: true,
  }],
  correctAnswer:{
    type: String,
    required: true,
  },
  courseId:[{
    type: mongoose.Types.ObjectId,
    ref: "Course",
  }],
  testId:[{
    type: mongoose.Types.ObjectId,
    ref: "Test",
  }],
}, { timestamps: true })



const MCQ = models?.MCQ || mongoose.model<IMCQ>("MCQ", MCQSchema)

export default MCQ