import { Response } from 'express';
import catchAsyncError from '../middlewares/catchAsyncError';
import { Request } from '../../types';
import prisma from '../../lib/prisma';

export const listVouchers = catchAsyncError(
  async (req: Request, res: Response) => {
    console.log('Fetching vouchers...');
    const vouchers = await prisma.voucher.findMany({});
    console.log(vouchers);
    res.json(vouchers);
  }
);
