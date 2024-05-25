import { Response } from 'express';
import { Request } from '../types';
import catchAsyncError from '../middlewares/catchAsyncError';
import ResponseHandler from '../utils/responseHandler';
import { sendToken } from '../utils/jwtToken';
import userService from '../services/user';
import prisma from '../lib/prisma';

export const registerUser = catchAsyncError(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(400)
        .json(
          new ResponseHandler(
            400,
            null,
            'Please provide name, email and password'
          )
        );
      return;
    }
    const user = await userService.createUser({ name, email, password });
    sendToken(user, 201, res);
  }
);

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
    const user = await userService.getUserByEmail(email);
    if (!user || user.password !== password) {
      res
        .status(401)
        .json(new ResponseHandler(401, null, 'Invalid email or password'));
      return;
    }
    sendToken(user, 200, res);
  }
);

export const listAllUsers = catchAsyncError(
  async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json(new ResponseHandler(200, users, 'All users fetched'));
  }
);

export const getUserById = catchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUserById(parseInt(id));
    res.status(200).json(new ResponseHandler(200, user, 'User fetched'));
  }
);

export const updateUser = catchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const user = await userService.updateUser(parseInt(id), data);
    res.status(200).json(new ResponseHandler(200, user, 'User updated'));
  }
);

export const deleteUser = catchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.deleteUser(parseInt(id));
    res.status(200).json(new ResponseHandler(200, user, 'User deleted'));
  }
);

export const logoutUser = catchAsyncError(
  async (req: Request, res: Response) => {
    res.cookie('token', null);
    res.status(200).json(new ResponseHandler(200, null, 'User logged out'));
  }
);

export const initDemoSetup = catchAsyncError(
  async (req: Request, res: Response) => {
    const user = await userService.promoteToAdmin(req.user.id);
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    const categories = await prisma.category.createManyAndReturn({
      data: [
        { name: 'Category 1' },
        { name: 'Category 2' },
        { name: 'Category 3' },
      ],
    });

    const cart = await prisma.cart.create({
      data: {
        userId: req.user.id,
        products: {
          createMany: {
            data: [
              {
                name: 'Product 1',
                price: 100,
                categoryId: categories[0].id,
              },
              {
                name: 'Product 2',
                price: 200,
                categoryId: categories[1].id,
              },
              {
                name: 'Product 3',
                price: 300,
                categoryId: categories[2].id,
              },
              {
                name: 'Product 4',
                price: 600,
                categoryId: categories[0].id,
              },
              {
                name: 'Product 5',
                price: 500,
                categoryId: categories[1].id,
              },
              {
                name: 'Product 6',
                price: 400,
                categoryId: categories[2].id,
              },
            ],
          },
        },
      },
      include: {
        products: true,
      },
    });

    res.status(200).json(new ResponseHandler(200, cart, 'Demo setup done'));
  }
);
