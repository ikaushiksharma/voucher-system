import { PrismaClient } from '@prisma/client';
import express from 'express';
import routes from './routes';
const prisma = new PrismaClient();
import { env } from '../constants';

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
