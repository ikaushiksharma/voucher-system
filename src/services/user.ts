import { User } from '@prisma/client';
import prisma from '../../lib/prisma';

export const createUser = async (data: User) => {
  return await prisma.user.create({ data });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const updateUser = async (id: number, data: User) => {
  return await prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
