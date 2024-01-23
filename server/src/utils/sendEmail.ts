import nodemailer from "nodemailer";
import Otp from "../models/otpModel";
import { IOtp } from "../Interfaces";
import cryptojs from "crypto-js";

function generateOTP(): number {
    const randomNum: number = Math.random() * 9000;
    return Math.floor(1000 + randomNum);
}

const sendEmailOtp = async (first_name: string, email: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "amarmanikavu@gmail.com",
                pass: "brwbmdkueueoqmdp",
            }
        });

        //Getting the otp number and saving it to the new model
        const otpnum: number = generateOTP();
        const hashedOTP: string = cryptojs.AES.encrypt(otpnum.toString(), "ecryptionkey").toString();

        const otpData = await Otp.updateOne(
            { email: email },
            { $set: { email: email, otp: hashedOTP } },
            { upsert: true });

        const mailOptions = {
            from: "amarmanikavu@gmail.com",
            to: email,
            subject: "BrightRoute",
            html: '<p> Hy  ' + first_name + "," + otpnum + ' is youre OTP Number'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log("Email has been sent to ", info.response);
                return true;
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return error;
        }
    }
}

export default sendEmailOtp;