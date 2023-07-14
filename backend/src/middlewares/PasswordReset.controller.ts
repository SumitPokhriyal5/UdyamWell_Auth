import { Request, Response, NextFunction } from 'express';
import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';
import otpGenerator from 'otp-generator';
import { UserModel } from '../models/User.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

// Send OTP
const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  let user = await UserModel.findOne({ email });

  if (user) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.UdyamWell_email,
        pass: process.env.UdyamWell_pass,
      },
    });

    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const mailOptions: SendMailOptions = {
      from: process.env.UdyamWell_email,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for resetting your password is ${otp}. This OTP is valid for 2 minutes.`,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
      if (error) {
        console.log('error occurred :T');
        res.send(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send({ sentOtp: otp, email, otpSentTime: Date.now() });
        next();
      }
    });
  } else {
    res.status(404).send('Email is not registered');
  }
};

// Verify OTP
const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, otp, sentOtp, otpSentTime } = req.body;

  if (email && sentOtp && otpSentTime) {
    const currentTime = Date.now();
    const timeDiff = currentTime - otpSentTime;

    if (otp === sentOtp && timeDiff <= 120000) {
      // OTP is valid for 2 minutes
      next();
    } else if (otp !== sentOtp) {
      res.status(401).send('Invalid OTP');
    } else if (timeDiff > 120000) {
      res.send('OTP expired');
    }
  } else {
    res.status(400).send('OTP not sent yet');
  }
};

// Update password
const updatePassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  let user = await UserModel.findOne({ email });

  if (user) {
    bcrypt.hash(newPassword, Number(process.env.saltRounds), async (err: Error, hash: string) => {
      if (hash) {
        user.password = hash;
        await user.save();
        res.status(200).send('Password updated successfully');
      } else {
        res.status(500).send({ error: err });
      }
    });
  } else {
    res.status(404).send('User not found');
  }
};

export { sendOtp, verifyOtp, updatePassword };
