import { Cart, User, Voucher } from '@prisma/client';
import prisma from '../lib/prisma';

async function validateVoucher(voucher: Voucher) {
  if (!voucher) {
    return { isApplicable: false, error: 'voucher not found' };
  }
  return { isApplicable: true, error: undefined, totalDiscount: 0 };
}

async function validateCart(cart: Cart) {
  if (!cart) {
    return { isApplicable: false, error: 'Cart not found' };
  }
  return { isApplicable: true, error: undefined, totalDiscount: 0 };
}

async function validateUser(user: User) {
  if (!user) {
    return { isApplicable: false, error: 'User not found' };
  }
  return { isApplicable: true, error: undefined, totalDiscount: 0 };
}

async function hasExistingOrders(userId: number) {
  const userWithOrders = await prisma.user.findUnique({
    where: { id: userId },
    include: { _count: { select: { orders: true } } },
  });
  return userWithOrders._count.orders > 0;
}

async function getVoucherDetails(voucherId: number, cartId: number) {
  const voucherCategories = await prisma.voucher
    .findUnique({ where: { id: voucherId } })
    .categories();
  const cartWithProducts = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { products: true },
  });
  let totalPrice = 0;
  cartWithProducts.products.forEach((item) => (totalPrice += item.price));
  return { voucherCategories, totalPrice };
}

async function calculateDiscount(
  totalPrice: number,
  applicableCategories: Set<number>,
  voucher: Voucher
) {
  let totalDiscount = 0;
  if (voucher.type === 'PERCENT') {
    totalDiscount = (totalPrice * voucher.percentOff) / 100;
  } else if (voucher.type === 'FIXED') {
    totalDiscount = voucher.amountOff;
  }
  if (voucher.maxDiscountAmount) {
    totalDiscount = Math.min(totalDiscount, voucher.maxDiscountAmount);
  }

  const isApplicable = applicableCategories.size > 0; // Check if any product is applicable

  const error = isApplicable
    ? undefined
    : `No product in cart is applicable for this voucher`;

  return { isApplicable, totalDiscount, error };
}

export {
  validateVoucher,
  validateCart,
  validateUser,
  hasExistingOrders,
  getVoucherDetails,
  calculateDiscount,
};
