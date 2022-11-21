import IMotorcycle from '../Interfaces/IMotorcycle';

export default class Cars {
  protected id?: string | undefined; // undefined se os dados não estiverem no banco (Ex: antes do cadastro)
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;
  private category:'Street' | 'Custom' | 'Trail';
  private engineCapacity: number;

  constructor(
    { id,
      model,
      year,
      color,
      buyValue,
      category,
      engineCapacity,
      status = false }: IMotorcycle,
  ) {
    this.id = id; // undefined se os dados não estiverem no banco (Ex: antes do cadastro)
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status;
    this.buyValue = buyValue;
    this.category = category;
    this.engineCapacity = engineCapacity;
  }
}
