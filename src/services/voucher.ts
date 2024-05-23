import prisma from '../../lib/prisma';
import { IVoucher } from '../../types';
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
};

export default voucherService;
