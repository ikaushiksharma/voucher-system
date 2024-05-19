import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.NODE_DOCKER_PORT,
};
