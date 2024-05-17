import schedule from "node-schedule";
import MentorProfile from "../models/Mentor";

const SpotJob = schedule.scheduleJob("0 0 1 * *", async () => {
  try {
    console.log("Spot Job Executed");
    await MentorProfile.updateMany({}, { spot: 5 });
  } catch (error) {
    console.log(error);
  }
});

export { SpotJob };

