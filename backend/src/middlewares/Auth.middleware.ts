import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.secretKey);

      if (decoded) {
        const userID = decoded.userID;
        req.body.userID = userID;
        next();
      } else {
        res.send('Please Login First');
      }
    } catch (error) {
      res.send('Please Login First');
    }
  } else {
    res.send('Please Login First');
  }
};

export { authenticate };
