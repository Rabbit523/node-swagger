import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IStreak {
  streakName: string;
  description: string;
  successCriteria: string;
  createdBy: string;
  participants: object[];
  startDate: Date;
  calendar?: object[];
}

export interface IFixedTermStreak extends IStreak {
  endDate: Date;
  duration: Number;
}

export interface ILastManStandingStreak extends IStreak {
  lastManStanding: boolean;
}

export const streakSchema = new Schema({
  streakName: {
    required: true,
    type: String,
    index: true,
  },
  description: {
    required: true,
    type: String,
  },
  createdBy: {
    required: true,
    type: String,
  },
  participants: {
    required: true,
    type: Array,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  calendar: {
    type: Array,
    default: [],
  },
  successCriteria: {
    type: String,
  },
  duration: {
    type: String,
  },
  endDate: {
    type: Date,
  },
  lastManStanding: {
    type: Boolean,
  },
},                                     {
  collection: 'Streaks',
},
);

export default mongoose.model('Streak', streakSchema);
