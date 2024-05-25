import { Role, User, VoucherType } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  cookies: any;
  user: User;
}

export interface IVoucher {
  slug: string;
  description: string;
  campaignName: string;
  validDaysOfWeek: number[];
  type: VoucherType;
  forNewUsersOnly: boolean;
  expiryDate: Date;
  maxRedemptions: number;
  timesRedeemed?: number;
  percentOff?: number;
  amountOff?: number;
  metadata?: {};
  maxDiscountAmount?: number;
  minOrderAmount?: number;
  maxRedemptionsPerUser?: number;
  cashbackAmount?: number;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: Role;
}
