import { Role, User } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  cookies: any;
  user: User;
}

export interface IVoucher {
  slug: string;
  description: string;
  redeemBy: Date;
  maxRedemptions: number;
  timesRedeemed?: number;
  percentOff?: number;
  amountOff?: number;
  maxDiscountAmount?: number;
  minOrderAmount?: number;
  metadata?: {};
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: Role;
}
