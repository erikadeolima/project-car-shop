import { NextFunction, Request, Response } from 'express';
// import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
// import CustomError from '../middlewares/errors/CustomError';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private motorcycleService: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.motorcycleService = new MotorcycleService();
  }

  async create() {
    try {
      const motorcycle: IMotorcycle = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        category: this.req.body.category,
        engineCapacity: this.req.body.engineCapacity,
      };
      const newMotorcycle = await this.motorcycleService.create(motorcycle);
      this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
  public async getAllMotorcycles() {
    const motorcycles = await this.motorcycleService.getAllMotorcycles();
    return this.res.status(200).json(motorcycles);
  }

  public async getMotorcycleById() {
    try {
      const { id } = this.req.params;
      const motorcycles = await this.motorcycleService.getMotorcycleById(id as string);
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateMotorcycleById() {
    const { id } = this.req.params;
    const motorcycleUpdated = this.req.body;
    try {
      const motorcycle = await this.motorcycleService.updateMotorcycleById(id, motorcycleUpdated);
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}