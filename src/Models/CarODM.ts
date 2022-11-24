import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

export default class VehicleODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    super(schema, 'cars');
  }
  // https://mongoosejs.com/docs/api.html#model_Model-findByIdAndUpdate

  public async updateCarById(_id: string, car: ICar): Promise<ICar | null > {
    return this.model.findByIdAndUpdate({ _id }, car, { new: true });
  }

  public async deleteCarById(_id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id });
    return result.acknowledged;
  }
}