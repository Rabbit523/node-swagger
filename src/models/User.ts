import * as mongoose from 'mongoose';
import { IStreak } from './Streak';

export const SALT_ROUNDS = 10;

enum UserTypes {
  user = 'user',
  admin = 'admin',
}

export interface IUser extends mongoose.Document {
  userName: string;
  email: string;
  password: string;
  createdAt: {
    type: Date,
    required: false,
  };
  modifiedAt: {
    type: Date,
    required: false,
  };
  streaks?: IStreak[];
  profilePicture?: {
    type: String,
  };
  role: string;
}

export const userSchema = new mongoose.Schema(
  {
    userName: {
      required: true,
      type: String,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      required: true,
      type: String,
    },
    streaks: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      enum: [UserTypes.user, UserTypes.admin],
      default: UserTypes.user,
    },
  },
  {
    timestamps: true,
    collection: 'Users',
  },
);

mongoose.set('useCreateIndex', true);
userSchema.index({ userName: 'text' });
userSchema.index({ email: 'text' });

export const userModel: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);
