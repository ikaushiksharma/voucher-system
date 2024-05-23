import { IUser } from '../../types';
import prisma from '../../lib/prisma';

const userService = {
  createUser: async (data: IUser) => {
    return await prisma.user.create({
      data,
    });
  },
  getUserByEmail: async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  },
  getUserById: async (id: number) => {
    return await prisma.user.findUnique({ where: { id } });
  },
  getAllUsers: async () => {
    return await prisma.user.findMany();
  },
  updateUser: async (id: number, data: IUser) => {
    return await prisma.user.update({ where: { id }, data });
  },
  deleteUser: async (id: number) => {
    return await prisma.user.delete({ where: { id } });
  },
};

export default userService;
