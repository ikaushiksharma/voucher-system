import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import routes from './routes';
import errorMiddleware from './middlewares/Error';
import { connectToDB } from './lib/dbConnect';
import morgan from 'morgan';
import cookies from 'cookie-parser';
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));

app.use(express.json());
app.use(cookies());

app.use('/api/v1', routes);

app.use(errorMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Voucherify API</h1>');
});

process.on('unhandledRejection', (err: any) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB(prisma);
});
