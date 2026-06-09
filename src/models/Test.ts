import mongoose, {models, Schema} from "mongoose"


export interface ITest {
  _id?: mongoose.Types.ObjectId,
  mcqs: mongoose.Types.ObjectId[],
  teacher?: mongoose.Types.ObjectId,  
  students: mongoose.Types.ObjectId[],
  createdAt?: Date,
  updatedAt?: Date
}


const testSchema = new Schema<ITest>({

  mcqs:[{
    type: mongoose.Types.ObjectId,
    ref: "MCQ",
  }],
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  students:[{
    type: mongoose.Types.ObjectId,
    ref: "User",
  }],
}, { timestamps: true })



const Test = models?.Test || mongoose.model<ITest>("Test", testSchema)

export default Test