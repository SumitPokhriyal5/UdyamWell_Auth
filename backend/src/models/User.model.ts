import { Schema, Document, Model, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  contact_number: number;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact_number: { type: Number, required: true },
});

const UserModel: Model<IUser> = model<IUser>('user', userSchema);

export { UserModel };
