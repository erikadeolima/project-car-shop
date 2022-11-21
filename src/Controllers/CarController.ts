import { NextFunction, Request, Response } from 'express';
// import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
// import CustomError from '../middlewares/errors/CustomError';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private carService: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.carService = new CarService();
  }

  async create() {
    try {
      const car: ICar = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        doorsQty: this.req.body.doorsQty,
        seatsQty: this.req.body.seatsQty,
      };
      const newCar = await this.carService.create(car);
      this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }
  public async getAllCars() {
    const cars = await this.carService.getAllCars();
    return this.res.status(200).json(cars);
  }

  public async getCarById() {
    try {
      const { id } = this.req.params;
      const car = await this.carService.getCarById(id as string);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateCarById() {
    const { id } = this.req.params;
    const carUpdated = this.req.body;
    try {
      const car = await this.carService.updateCarById(id, carUpdated);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }
}