import { Response } from 'express';
import catchAsyncError from '../middlewares/catchAsyncError';
import { Request } from '../../types';
import prisma from '../../lib/prisma';

export const listVouchers = catchAsyncError(
  async (req: Request, res: Response) => {
    try {
      const vouchers = await prisma.voucher.findMany();
      res.json(vouchers);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while fetching vouchers' });
    }
  }
);
