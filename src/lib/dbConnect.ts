import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export function connectToDB(
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) {
  try {
    prisma.$connect();
    console.log('db connected');
  } catch (err) {
    console.log('error', err);
  }
}
