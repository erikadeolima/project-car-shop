import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carsRoutes = Router();

carsRoutes.post('/cars', (req, res, next) => new CarController(req, res, next).create());
carsRoutes.get('/cars/', (req, res, next) => new CarController(req, res, next).getAllCars());
carsRoutes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getCarById());
carsRoutes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).updateCarById());
carsRoutes.delete('/cars/:id', (req, res, next) => 
  new CarController(req, res, next).deleteCarById());

export default carsRoutes;