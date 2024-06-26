import nodemailer from "nodemailer";
import Otp from "../models/Otp";
import cryptojs from "crypto-js";

function generateOTP(): number {
  const randomNum: number = Math.random() * 9000;
  return Math.floor(1000 + randomNum);
}

const sendEmailOtp = async (
  first_name: string,
  last_name: string,
  email: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "amarmanikavu@gmail.com",
        pass: process.env.NODEMAILER_PASS as string,
      },
    });

    const otpnum: number = generateOTP();
    const hashedOTP: string = cryptojs.AES.encrypt(
      otpnum.toString(),
      process.env.HASH_KEY as string
    ).toString();

    await Otp.updateOne(
      { email: email },
      { $set: { email: email, otp: hashedOTP } },
      { upsert: true }
    );

    const mailOptions = {
      from: "amarmanikavu@gmail.com",
      to: email,
      subject: "BrightRoute OTP",
      html: `<p> Hy  ${first_name || ""} ${last_name || ""}, ${otpnum} is your OTP Number</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log("Email has been sent to ", info.response);
        return true;
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default sendEmailOtp;
