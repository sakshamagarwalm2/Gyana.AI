import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

export interface IChat {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  chats: IChat[];
}

const chatSchema = new mongoose.Schema<IChat>({
  id: {
    type: String,
    default: () => randomUUID()
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'assistant']
  },
  content: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  chats: [chatSchema]
});

export default mongoose.model<IUser>('User', userSchema);