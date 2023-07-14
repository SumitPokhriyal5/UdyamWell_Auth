import express from 'express';
import { sendOtp, verifyOtp, updatePassword } from '../controllers/PasswordReset.controller.js';
import { getUsers, loginUser, registerUser } from '../controllers/User.controller.js';

const userRouter = express.Router();

// Get all users route
userRouter.get('/', getUsers);

// Register route
userRouter.post('/register', registerUser);

// Login route
userRouter.post('/login', loginUser);

// Forgot password route
userRouter.post('/sendOtp', sendOtp);

// verify otp route
userRouter.post('/verifyOtp', verifyOtp);

// update password route
userRouter.post('/updatePassword', updatePassword);

export { userRouter };
