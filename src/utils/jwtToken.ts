import { User } from '@prisma/client';
import { Response } from 'express';
import  jwt  from 'jsonwebtoken';
export const sendToken = (user: User, statusCode: number, res: Response) => {
  const token = generateToken(user);
  const options = {
    expires: new Date(
      Date.now() + +process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};

export const generateToken = (user: User) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};
