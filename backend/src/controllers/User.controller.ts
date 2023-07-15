import { UserModel } from '../models/User.model.js';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

// get users controller
const getUsers = async (req: Request, res: Response) => {
    try {
      let users = await UserModel.find();
      res.send(users);
    } catch (err) {
      res.send(err);
    }
  }

// register user controller
const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, contact_number } = req.body;
  
    try {
      const alreadyUser = await UserModel.findOne({ email });
  
      if (alreadyUser) {
        res.status(400).send('User already exists, please login');
      } else {
        bcrypt.hash(password, Number(process.env.saltRounds), async (err, hash) => {
          if (hash) {
            const user = new UserModel({
              name,
              email,
              password: hash,
              contact_number,
            });
  
            await user.save();
            res.status(200).send('Registered');
          } else {
            res.status(500).send(err);
          }
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // login user controller
  const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    // Check if email and password are present in the request body
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
  
    try {
      const user = await UserModel.findOne({ email });
  
      // Check if user exists in the database
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.secretKey);
          user.save();
          res.send({ msg: 'Login Successful', token: token, name: user.name });
        } else {
          res.status(401).send('Incorrect password');
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  export { getUsers, registerUser, loginUser };