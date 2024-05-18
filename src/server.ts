import express from 'express';
import { env } from '../constants';

const app = express();
const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
