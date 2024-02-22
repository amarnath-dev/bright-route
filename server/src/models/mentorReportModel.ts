import mongoose, { Schema } from "mongoose";
import { IReport } from "../Interfaces";

const reportSchema: Schema<IReport> = new mongoose.Schema<IReport>(
  {
    mentor_id: {
      type: String,
    },
    mentee_id: {
      type: String,
    },
    ReportDetails: [
      {
        issue_faced: {
          type: String,
        },
        issue_desc: {
          type: String,
        },
        report_date: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IReport>("MentorReport", reportSchema);
