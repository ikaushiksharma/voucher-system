import { Cart, User, Voucher } from '@prisma/client';
import prisma from '../lib/prisma';
import { IVoucher } from '../types';
import {
  calculateDiscount,
  getCartTotal,
  getVoucherCategories,
  hasExistingOrders,
  validateCart,
  validateUser,
  validateVoucher,
} from '../utils/helper';
const voucherService = {
  createVoucher: async (data: IVoucher) => {
    console.log(data);
    return await prisma.voucher.create({ data });
  },

  getVoucherById: async (id: number) => {
    return await prisma.voucher.findUnique({ where: { id } });
  },

  getVoucherBySlug: async (slug: string) => {
    return await prisma.voucher.findUnique({ where: { slug } });
  },

  getAllVouchers: async () => {
    return await prisma.voucher.findMany();
  },

  updateVoucher: async (id: number, data: IVoucher) => {
    return await prisma.voucher.update({ where: { id }, data });
  },

  deleteVoucher: async (id: number) => {
    return await prisma.voucher.delete({ where: { id } });
  },

  isVoucherApplicable: async (voucher: Voucher, cart: Cart, user: User) => {
    // Input validation
    const validations = [
      validateVoucher(voucher),
      validateCart(cart),
      validateUser(user),
    ];
    const errors = validations.find((validation) => !validation);
    if (errors) {
      return errors;
    }
    // Check voucher expiry
    if (voucher.expiryDate < new Date()) {
      return { isApplicable: false, error: 'voucher expired' };
    }

    // Check voucher validity for new users
    if (voucher.forNewUsersOnly && (await hasExistingOrders(user.id))) {
      return {
        isApplicable: false,
        error: 'voucher valid only for new users',
      };
    }

    // check for max redemptions per user
    if (voucher.maxRedemptionsPerUser != undefined) {
      const voucherUsage = await prisma.order.count({
        where: {
          userId: user.id,
          voucherId: voucher.id,
        },
      });

      if (
        voucherUsage != undefined &&
        voucher.maxRedemptionsPerUser != undefined &&
        voucherUsage >= voucher.maxRedemptionsPerUser
      ) {
        return {
          isApplicable: false,
          error: 'maximum redemptions reached for the user',
        };
      }
    }

    // check if voucher max redemptions have been exceeded

    const voucherRedemptions = await prisma.order.count({
      where: {
        voucherId: voucher.id,
      },
    });
    if (
      voucher.maxRedemptions != undefined &&
      voucherRedemptions >= voucher.maxRedemptions
    ) {
      return {
        isApplicable: false,
        error: 'maximum redemptions reached for the voucher',
      };
    }

    // check if valid today
    const today = new Date().getDay();
    if (
      voucher.validDaysOfWeek.length != 0 &&
      !voucher.validDaysOfWeek.includes(today)
    ) {
      return {
        isApplicable: false,
        error: 'voucher not applicable for the day',
      };
    }

    const cartTotal = await getCartTotal(cart.id);

    // check for min order value
    if (cartTotal < voucher.minOrderAmount) {
      return {
        isApplicable: false,
        error:
          'Total purchase amount is less than minimum purchase required for the voucher',
      };
    }

    // Fetch voucher categories and calculate total price
    const voucherCategories = await getVoucherCategories(voucher.id);

    // Check product applicability and calculate discount
    const { isApplicable, error, totalDiscount } = await calculateDiscount(
      cartTotal,
      cart,
      voucherCategories,
      voucher
    );

    if (!isApplicable) {
      return { isApplicable, error };
    }

    // Final response
    return { isApplicable, error, totalDiscount, cartTotal };
  },
};

export default voucherService;
