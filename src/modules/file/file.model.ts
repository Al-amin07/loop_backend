import { model, Schema } from 'mongoose';
import { IFile } from './file.interface';

const fileSchema = new Schema<IFile>(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
      enum: ['image/jpeg', 'image/png', 'application/pdf'],
    },
    data: {
      type: Buffer,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true },
);

export const File = model<IFile>('File', fileSchema);
