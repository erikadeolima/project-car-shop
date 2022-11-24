import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import CustomError from '../middlewares/errors/CustomError';

const invalidMongoId = 'Invalid mongo id';
const notFound = 'Car not found';

export default class CarService {
  private CarODM: CarODM;

  constructor() {
    this.CarODM = new CarODM();
  }

  async create(obj: ICar) {
    const newCar = await this.CarODM.create(obj);

    return this.createCarDomain(newCar);
  }

  async getAllCars() {
    const cars = await this.CarODM.getAll();

    return cars.map((car) => this.createCarDomain(car));
  }

  async getCarById(id:string) {
    if (!isValidObjectId(id)) {
      throw new CustomError(invalidMongoId, 422);
    }
    const carSearchResult = await this.CarODM.getById(id);
  
    if (!carSearchResult) {
      throw new CustomError(notFound, 404);
    }
    return this.createCarDomain(carSearchResult);
  }

  async updateCarById(id:string, car: ICar) {
    if (!isValidObjectId(id)) {
      throw new CustomError(invalidMongoId, 422);
    }
    const carToUpdate = await this.CarODM.updateCarById(id, { ...car });
    if (!carToUpdate) {
      throw new CustomError(notFound, 404);
    }
    return this.createCarDomain(carToUpdate);
  }

  async deleteCarById(id:string) {
    if (!isValidObjectId(id)) {
      throw new CustomError(invalidMongoId, 422);
    }
    const result = await this.CarODM.deleteCarById(id);
    
    if (result === false || result === undefined) {
      throw new CustomError(notFound, 404);
    }
    return result;
  }

  private createCarDomain(car: ICar | null): Car | null | undefined {
    if (car) {
      return new Car(car);
    }
    return null;
  }
}