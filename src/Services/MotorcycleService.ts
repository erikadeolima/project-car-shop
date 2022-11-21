import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import CustomError from '../middlewares/errors/CustomError';

export default class MotorcycleService {
  private MotorcycleODM: MotorcycleODM;

  constructor() {
    this.MotorcycleODM = new MotorcycleODM();
  }

  async create(obj: IMotorcycle) {
    const newMotorcycle = await this.MotorcycleODM.create(obj);

    return this.createMotorcycleDomain(newMotorcycle);
  }

  async getAllMotorcycles() {
    const motorcycles = await this.MotorcycleODM.getAll();

    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  async getMotorcycleById(id:string) {
    if (!isValidObjectId(id)) {
      throw new CustomError('Invalid mongo id', 422);
    }
    const motorcycleSearchResult = await this.MotorcycleODM.getById(id);
  
    if (!motorcycleSearchResult) {
      throw new CustomError('Motorcycle not found', 404);
    }
    return this.createMotorcycleDomain(motorcycleSearchResult);
  }

  async updateMotorcycleById(id:string, motorcycle: IMotorcycle) {
    if (!isValidObjectId(id)) {
      throw new CustomError('Invalid mongo id', 422);
    }
    const motorcycleToUpdate = await this.MotorcycleODM.updateMotorcycleById(id, { ...motorcycle });
    if (!motorcycleToUpdate) {
      throw new CustomError('Motorcycle not found', 404);
    }
    return this.createMotorcycleDomain(motorcycleToUpdate);
  }
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null | undefined {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }
}