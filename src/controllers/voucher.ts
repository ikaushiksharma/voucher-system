import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();
const voucherController = {
  list: async (req: Request, res: Response) => {
    try {
      const vouchers = await prisma.voucher.findMany();
      res.json(vouchers);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while fetching vouchers' });
    }
  },
};

export default voucherController;
