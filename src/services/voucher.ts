import { Voucher } from '@prisma/client';
import prisma from '../../lib/prisma';

export const createVoucher = async (data: Voucher) => {
  return await prisma.voucher.create({ data });
};

export const getVoucherById = async (id: number) => {
  return await prisma.voucher.findUnique({ where: { id } });
};

export const getVoucherBySlug = async (slug: string) => {
  return await prisma.voucher.findUnique({ where: { slug } });
};

export const getAllVouchers = async () => {
  return await prisma.voucher.findMany();
};

export const updateVoucher = async (id: number, data: Voucher) => {
  return await prisma.voucher.update({ where: { id }, data });
};

export const deleteVoucher = async (id: number) => {
  return await prisma.voucher.delete({ where: { id } });
};
