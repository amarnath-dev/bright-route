import mongoose, { Schema } from "mongoose";
import { ISkill } from "../Interfaces";

const skillSchema: Schema<ISkill> = new mongoose.Schema<ISkill>({
  topTechnicalSkills: [
    {
      label: {
        type: String,
      },
    },
  ],
});

export default mongoose.model<ISkill>("skill", skillSchema);
