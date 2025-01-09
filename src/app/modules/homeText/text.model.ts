import { model, Schema } from 'mongoose';
import { IText } from './text.interface';

const textSchema = new Schema<IText>(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Text = model<IText>('Text', textSchema);
