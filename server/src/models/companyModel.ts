import mongoose, { Schema } from "mongoose";
import { ICompany } from "../Interfaces";

const companySchema: Schema<ICompany> = new mongoose.Schema<ICompany>({
  topTechnicalSkills: [
    {
      label: {
        type: String,
      },
    },
  ],
});

export default mongoose.model<ICompany>("company", companySchema);
