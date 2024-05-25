import { Response } from 'express';
import catchAsyncError from '../middlewares/catchAsyncError';
import { Request } from '../types';
import prisma from '../lib/prisma';
import voucherService from '../services/voucher';
import { getCartTotal } from '../utils/helper';

export const createVoucher = catchAsyncError(
  async (req: Request, res: Response) => {
    const {
      slug,
      campaignName,
      expiryDate,
      validDaysOfWeek,
      description,
      forNewUsersOnly,
      type,
      maxRedemptions,
    } = req.body;
    const voucher = await voucherService.createVoucher({
      ...req.body,
      slug: slug.toUpperCase(),
      description,
      campaignName,
      validDaysOfWeek,
      forNewUsersOnly,
      type,
      expiryDate: new Date(expiryDate),
      maxRedemptions: maxRedemptions,
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

export const applyVoucher = catchAsyncError(
  async (req: Request, res: Response) => {
    const { voucherId, cartId } = req.params;
    const user = req.user;

    const voucher = await prisma.voucher.findUnique({
      where: { id: +voucherId },
    });
    const cart = await prisma.cart.findUnique({
      where: { id: +cartId },
      include: { products: true },
    });

    const result = await voucherService.isVoucherApplicable(
      voucher,
      cart,
      user
    );

    if (!result.isApplicable) {
      return res.status(400).json({ message: result.error });
    }
    let walletBalance = user.walletBalance;
    const totalAmount = await getCartTotal(cart.id);

    if (voucher.redeemType === 'CASHBACK') {
      const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: { walletBalance: user.walletBalance + result.totalDiscount },
      });
      walletBalance = updateUser.walletBalance;
    }
    const finalAmount =
      voucher.redeemType === 'CASHBACK'
        ? totalAmount
        : totalAmount - result.totalDiscount;

    res.json({
      walletBalance,
      finalAmount,
      totalAmount,
      discount: result.totalDiscount,
    });
  }
);
