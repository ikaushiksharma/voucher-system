import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();
const discountController = {
  list: async (req: Request, res: Response) => {
    try {
      let searchQuery = {};
      const from = req.query.from;
      if (from) {
        const currentTime = new Date();
        searchQuery = {
          // dateCreated: { $gte: new Date(from), $lt: currentTime },
        };
      }

      const discounts = await prisma.discount.findMany();
      res.json(discounts);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while fetching discounts' });
    }
  },
  read: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const discount = await prisma.discount.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.json(discount);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while fetching discount' });
    }
  },

  create: async (req: Request, res: Response) => {
    const { code, user } = req.body;
    try {
      const discount = await prisma.voucher.create({
        data: {
          code: code.toUpperCase(),
        },
      });
      res.json(discount);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while creating discount' });
    }
  },
};

export default discountController;

// Coupon.find({ code: couponCode.toUpperCase() }).exec(function (err, coupons) {
//   if (err) {
//     return res.status(400).json(err);
//   }
//   else if (coupons.length === 0) {
//     return res.status(404).json('Coupon ‘' + couponCode.toUpperCase() + '’ not found');
//   }
//   else {
//       // Update or create Discount object
//     req.body.coupon = coupons[0]._id;
//     Discount.update({ code: req.body.code, user: req.body.user }, { $set: req.body }, { upsert: true }, function (err, rowsUpdated) {
//       if (err) {
//         return res.status(400).json(err);
//       }
//       else {
//         console.log('Applied discount %s to user %s.', req.body.code, req.body.user)
//         return res.json(req.body);
//       }
//     });
//   }
// });
// },
