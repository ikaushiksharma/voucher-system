import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.BACKEND_PORT,
};
