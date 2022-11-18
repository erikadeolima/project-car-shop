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
    const car = await this.CarODM.getById(id);
    console.log('🚀 ~ file: CarService.ts ~ line 30 ~ CarService ~ getCarById ~ car', car);
    
    if (!car) {
      throw new CustomError('Car not found', 404);
    }
    return this.createCarDomain(car);
  }

  private createCarDomain(car: ICar): Car {
    return new Car(car);
  }
}