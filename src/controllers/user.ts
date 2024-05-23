import { Response } from 'express';
import { Request } from '../../types';
import catchAsyncError from '../middlewares/catchAsyncError';
import ResponseHandler from '../utils/responseHandler';
import { sendToken } from '../utils/jwtToken';
import { getUserByEmail } from '../services/user';

export const loginUser = catchAsyncError(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json(
          new ResponseHandler(400, null, 'Please provide email and password')
        );
      return;
    }
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
      res
        .status(401)
        .json(new ResponseHandler(401, null, 'Invalid email or password'));
      return;
    }

    sendToken(user, 200, res);
  }
);

const applyVoucher = catchAsyncError(async (req: Request, res: Response) => {
  const { voucherId, amount } = req.body;
  const user = req.user;
  if (!user || !amount) {
    res
      .status(400)
      .json(
        new ResponseHandler(400, null, 'User not found or amount not provided')
      );
    return;
  }
  if (!voucherId) {
    res
      .status(201)
      .json(
        new ResponseHandler(
          201,
          { amount: amount, discount: 0 },
          'No voucher applied'
        )
      );
    return;
  }

  //     const canUseVoucher = await canUserUseVoucher(userId, voucherId, total);
  //     if(!canUseVoucher.status){
  //         res.status(400).json(new ResponseHandler(400, {total: total, discount:0}, canUseVoucher.message))
  //         return;
  //     }
  //     const discount = await calculateDiscount(userId, voucherId, total);
  //     res.status(200).json(new ResponseHandler(200, {total: (total-discount), discount: discount}'Discount calculated'))
  // })

  if (!amount) {
    res
      .status(400)
      .json(new ResponseHandler(400, null, 'Please provide amount'));
    return;
  }
  res
    .status(200)
    .json(new ResponseHandler(200, { amount }, 'Payment successful'));
});
