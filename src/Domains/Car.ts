import ICar from '../Interfaces/ICar';

export default class Cars {
  protected id?: string | undefined; // undefined se os dados não estiverem no banco (Ex: antes do cadastro)
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;
  private doorsQty:number;
  private seatsQty: number;

  constructor(
    { id,
      model,
      year,
      color,
      buyValue,
      seatsQty,
      doorsQty,
      status = false }: ICar,
  ) {
    this.id = id; // undefined se os dados não estiverem no banco (Ex: antes do cadastro)
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }
/* 
  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setPayByPerson(payByPerson: string) {
    this.payByPerson = payByPerson;
  }

  public getPayByPerson() {
    return this.payByPerson;
  }

  public setPayToPerson(payToPerson: string) {
    this.payToPerson = payToPerson;
  }

  public getPayToPerson() {
    return this.payToPerson;
  }

  public setAmount(amount: number) {
    this.amount = amount;
  }

  public getAmount() {
    return this.amount;
  }

  public setKey(key: string) {
    this.key = key;
  }

  public getKey() {
    return this.key;
  } */
}
