import express from 'express';
import ErrorHandler from './middlewares/errors/ErrorHandler';
import carsRoutes from './Routes/cars';

const app = express();

app.use(express.json());
app.use(carsRoutes);
app.use(ErrorHandler);

export default app;
