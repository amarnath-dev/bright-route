import schedule from "node-schedule";
import Payment from "../models/Payment";

const job = schedule.scheduleJob("0 0 * * *", async () => {
  try {
    console.log("Cron Job Exicuted");
    const thresholdDuration = 30 * 24 * 60 * 60 * 1000;
    await Payment.updateMany(
      {
        isExpired: false,
        createdAt: { $lt: new Date(Date.now() - thresholdDuration) },
      },
      { $set: { isExpired: true } }
    );
  } catch (error) {
    console.log(error);
  }
});

export { job };

// 0 0 1 * *
