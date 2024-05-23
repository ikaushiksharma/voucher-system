import { Response } from 'express';
import catchAsyncError from '../middlewares/catchAsyncError';
import { Request } from '../../types';
import prisma from '../../lib/prisma';
import voucherService from '../services/voucher';

export const createVoucher = catchAsyncError(
  async (req: Request, res: Response) => {
    const { code, redeemBy } = req.body;
    const voucher = await voucherService.createVoucher({
      slug: code.toUpperCase(),
      description: 'Discount',
      redeemBy: new Date(redeemBy),
      maxRedemptions: 2,
    });
    res.json(voucher);
  }
);

export const listVouchers = catchAsyncError(
  async (req: Request, res: Response) => {
    console.log('Fetching vouchers...');
    const vouchers = await voucherService.getAllVouchers();
    console.log(vouchers);
    res.json(vouchers);
  }
);

export const getVoucherById = catchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const voucher = await voucherService.getVoucherById(parseInt(id));
    res.json(voucher);
  }
);

export const getVoucherBySlug = catchAsyncError(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const voucher = await voucherService.getVoucherBySlug(slug);
    res.json(voucher);
  }
);

export const updateVoucher = catchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const voucher = await voucherService.updateVoucher(parseInt(id), data);
    res.json(voucher);
  }
);

export const deleteVoucher = catchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const voucher = await voucherService.deleteVoucher(parseInt(id));
    res.json(voucher);
  }
);
