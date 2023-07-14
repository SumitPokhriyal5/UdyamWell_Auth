import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/User.route.js';
import connectDB from './config/db.js';
import cors from 'cors'

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: 'Welcome to the homepage' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Internal server error!', error });
  }
});

app.use('/users', userRouter);

app.use('*', async (req: Request, res: Response) => {
  res.sendStatus(422);
});

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  try {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('⏳ Database connecting...');
    await connectDB;
    console.log('✅ Database connected.');
  } catch (error) {
    console.log('❌ Error:', error);
  }
});
