import mongoose, { ObjectId } from "mongoose";

interface IJob {
  company: string;
  position: string;
  status: string;
  createdBy: ObjectId;
}

interface IJobDocument extends IJob, Document {}

const JobSchema = new mongoose.Schema<IJobDocument>(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model<IJobDocument>("Job", JobSchema);

export default Job;
