import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

export default class VehicleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });

    super(schema, 'motorcycles');
  }
  // https://mongoosejs.com/docs/api.html#model_Model-findByIdAndUpdate
  public async updateMotorcycleById(_id: string, motorcycle: IMotorcycle)
    : Promise<IMotorcycle | null > {
    return this.model.findByIdAndUpdate({ _id }, motorcycle, { new: true });
  }

  public async deleteMotorcycleById(_id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id });
    return result.acknowledged;
  }
}