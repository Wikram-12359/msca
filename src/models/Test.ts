// models/Test.ts
import mongoose, { Schema, model, models } from "mongoose";

export interface IQuestion {
  text: string;
  options: string[];
  correct: number;
}

export interface ITest {
  _id: string;
  title: string;
  course: mongoose.Types.ObjectId;
  duration: number;
  marksPerQuestion: number;
  negativeMarking: number;
  questions: IQuestion[];
  attempted: boolean;
  createdBy: string;
  isPublished: boolean;
  createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct: { type: Number, required: true },
});

const TestSchema = new Schema<ITest>(
  {
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    duration: { type: Number, required: true },
    marksPerQuestion: { type: Number, default: 1 },
    negativeMarking: { type: Number, default: 0 },
    attempted: {type: Boolean, default: false},
    questions: [QuestionSchema],
    createdBy: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Test || model<ITest>("Test", TestSchema);