import mongoose, {models, Schema} from "mongoose"


export interface IResult {
  _id?: mongoose.Types.ObjectId,
  score: number,
  totalScore: number,
  student: mongoose.Types.ObjectId,
  testId: mongoose.Types.ObjectId,
  attempted?: boolean,
}


const resultSchema = new Schema<IResult>({
  score:{
    type: Number,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  student: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  testId:[{
    type: mongoose.Types.ObjectId,
    ref: "Test",
  }],
  attempted: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })



const Result = models?.Result || mongoose.model<IResult>("Result", resultSchema)

export default Result