import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import CustomError from '../middlewares/errors/CustomError';

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
      throw new CustomError('Invalid mongo id', 422);
    }
    const carSearchResult = await this.CarODM.getById(id);
  
    if (!carSearchResult) {
      throw new CustomError('Car not found', 404);
    }
    return this.createCarDomain(carSearchResult);
  }

  async updateCarById(id:string, car: ICar) {
    if (!isValidObjectId(id)) {
      throw new CustomError('Invalid mongo id', 422);
    }
    const carToUpdate = await this.CarODM.updateCarById(id, { ...car });
    if (!carToUpdate) {
      throw new CustomError('Car not found', 404);
    }
    return this.createCarDomain(carToUpdate);
  }
  private createCarDomain(car: ICar | null): Car | null | undefined {
    if (car) {
      return new Car(car);
    }
    return null;
  }
}