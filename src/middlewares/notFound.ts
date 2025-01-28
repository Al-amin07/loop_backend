/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

const notFound = (req: Request, res: Response): any => {
  return res.status(404).json({
    success: false,
    message: 'API not found',
    error: '',
  });
};

export default notFound;
