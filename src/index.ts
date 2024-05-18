import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
import { env } from '../constants';

const app = express();
const PORT = env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
