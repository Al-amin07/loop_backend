import { model, Schema } from 'mongoose';
import { IWork } from './work.interface';

const workSchema = new Schema<IWork>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export const WorkModel = model<IWork>('Work', workSchema);
