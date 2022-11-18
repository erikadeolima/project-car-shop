/* export default interface ICar {
  id?: string
  model: string
  year: number
  color: string
  status?: boolean
  buyValue: number
  doorsQty: number
  seatsQty: number
} */
import IVehicle from './IVehicle';

export default interface ICar extends IVehicle {
  doorsQty: number;
  seatsQty: number;
}

/* export default ICarService {
  add (car: ICar): Promise <ICar>
} */