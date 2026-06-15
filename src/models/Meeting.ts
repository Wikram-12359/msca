// models/Meeting.ts
import mongoose, { Schema, model, models } from "mongoose";

export interface IMeeting {
  _id: string;
  title: string;
  description?: string;
  teacher: mongoose.Types.ObjectId;
  course?: mongoose.Types.ObjectId;
  subject?: mongoose.Types.ObjectId;
  meetingLink: string;
  isActive: boolean;
  createdAt: Date;
}

const MeetingSchema = new Schema<IMeeting>(
  {
    title: { type: String, required: true },
    description: { type: String },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    subject: { type: Schema.Types.ObjectId, ref: "Subject", },
    meetingLink: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Meeting || model<IMeeting>("Meeting", MeetingSchema);