import { Types } from 'mongoose';

export interface IFile {
  user_id: Types.ObjectId;
  fileType: string;
  fileName: string;
  contentType: 'image/jpeg' | 'image/png' | 'application/pdf';
  data: Buffer;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
}
