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

async function getVoucherCategories(voucherId: number) {
  const voucher = await prisma.voucher.findUnique({
    where: { id: voucherId },
    select: {
      categories: { select: { id: true } },
    },
  });
  const voucherCategories = new Set(voucher.categories.map((c) => c.id));

  return voucherCategories;
}

async function calculateDiscount(
  totalPrice: number,
  cart: Cart,
  applicableCategories: Set<number>,
  voucher: Voucher
) {
  let total = 0;

  // discount valid categories only
  const cartWithProducts = await prisma.cart.findUnique({
    where: { id: cart.id },
    select: { products: true },
  });

  if (applicableCategories.size === 0) {
    total = totalPrice;
  } else {
    cartWithProducts.products.forEach((item) => {
      if (applicableCategories.has(item.categoryId)) {
        total += item.price;
      }
    });
    if (total === totalPrice) {
      return {
        isApplicable: false,
        totalDiscount: 0,
        error: 'No product in cart is applicable for this voucher',
      };
    }
  }

  let totalDiscount = 0;

  if (voucher.type === 'PERCENT_DISCOUNT') {
    totalDiscount = (totalPrice * voucher.percentOff) / 100;
  } else if (voucher.type === 'AMOUNT_DISCOUNT') {
    totalDiscount = voucher.amountOff;
  }
  if (voucher.maxDiscountAmount) {
    totalDiscount = Math.min(totalDiscount, voucher.maxDiscountAmount);
  }

  return { isApplicable: true, totalDiscount, error: undefined };
}

const getCartTotal = async (cartId: number) => {
  const cartWithProducts = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { products: true },
  });
  let totalPrice = 0;
  cartWithProducts.products.forEach((item) => (totalPrice += item.price));
  return totalPrice;
};
export {
  validateVoucher,
  validateCart,
  validateUser,
  hasExistingOrders,
  getVoucherCategories,
  calculateDiscount,
  getCartTotal,
};
