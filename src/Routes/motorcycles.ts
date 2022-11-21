import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcyclesRoutes = Router();

motorcyclesRoutes
  .post('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).create());
motorcyclesRoutes
  .get('/motorcycles/', (req, res, next) => 
    new MotorcycleController(req, res, next).getAllMotorcycles());
motorcyclesRoutes
  .get('/motorcycles/:id', (req, res, next) => 
    new MotorcycleController(req, res, next).getMotorcycleById());
motorcyclesRoutes
  .put('/motorcycles/:id', (req, res, next) => 
    new MotorcycleController(req, res, next).updateMotorcycleById());

export default motorcyclesRoutes;