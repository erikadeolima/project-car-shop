import {
  Model,
  models,
  Schema,
  model,
  isValidObjectId,
} from 'mongoose';
import CustomError from '../middlewares/errors/CustomError';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async getById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new CustomError('Invalid mongo id', 422);

    return this.model.findById(id);
  }
}

export default AbstractODM;