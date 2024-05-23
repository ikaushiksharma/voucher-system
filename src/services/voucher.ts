import { Cart, User, Voucher } from '@prisma/client';
import prisma from '../lib/prisma';
import { IVoucher } from '../types';
import {
  calculateDiscount,
  getVoucherDetails,
  hasExistingOrders,
  validateCart,
  validateUser,
  validateVoucher,
} from '../utils/helper';
const voucherService = {
  createVoucher: async (data: IVoucher) => {
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

    // Fetch voucher categories and calculate total price
    const { voucherCategories, totalPrice } = await getVoucherDetails(
      voucher.id,
      cart.id
    );
    const applicableCategories = new Set(voucherCategories.map((c) => c.id));

    // Check product applicability and calculate discount
    const { isApplicable, error, totalDiscount } = await calculateDiscount(
      totalPrice,
      applicableCategories,
      voucher
    );

    if (!isApplicable) {
      return { isApplicable, error };
    }
    // Check minimum order amount
    if (totalPrice < voucher.minOrderAmount) {
      return {
        isApplicable: false,
        error:
          'Total purchase amount is less than minimum purchase required for the voucher',
      };
    }

    // Final response
    return { isApplicable, error, totalDiscount };
  },
};

export default voucherService;
