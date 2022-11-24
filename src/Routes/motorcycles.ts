import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcyclesRoutes = Router();

const motorcycleWithIdParams = '/motorcycles/:id';

motorcyclesRoutes
  .post('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).create());
motorcyclesRoutes
  .get('/motorcycles/', (req, res, next) => 
    new MotorcycleController(req, res, next).getAllMotorcycles());
motorcyclesRoutes
  .get(motorcycleWithIdParams, (req, res, next) => 
    new MotorcycleController(req, res, next).getMotorcycleById());
motorcyclesRoutes
  .put(motorcycleWithIdParams, (req, res, next) => 
    new MotorcycleController(req, res, next).updateMotorcycleById());
motorcyclesRoutes
  .delete(motorcycleWithIdParams, (req, res, next) => 
    new MotorcycleController(req, res, next).deleteMotorcycleById());

export default motorcyclesRoutes;