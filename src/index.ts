import { PrismaClient } from '@prisma/client';
import express from 'express';
import routes from './routes';
import errorMiddleware from './middlewares/Error';
import { connectToDB } from './lib/dbConnect';
import morgan from 'morgan';
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('combined'));

app.use(express.json());

app.use('/api/v1', routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB(prisma);
});
