import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

// const invalidMongoId = 'Invalid mongo id';
const notFound = 'Car not found';

const carsWithID: ICar = {
  id: '634852326b35b59438fbea2f',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

const carsWithoutID: ICar = {
  model: 'Marea',
  year: 1992,
  color: 'Red',
  status: true,
  buyValue: 12.000,
  doorsQty: 2,
  seatsQty: 5,
};

const carsArray: ICar[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
    status: false,
  },
];

describe('Testa a camada CarService', function () {
  it('Se é possivel cadastrar um carro na rota POST `/cars`', async function () {
    const outputCar: Car = new Car(carsWithoutID);

    sinon.stub(Model, 'create').resolves(outputCar);

    const service = new CarService();
    const result = await service.create(carsWithoutID);

    expect(result).to.be.deep.equal(outputCar);
  });

  it('Se é possivel listar os carros na rota GET `/cars`', async function () {
    sinon.stub(Model, 'find').resolves(carsArray);

    const service = new CarService();
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(carsArray);
  });

  it('Se é possivel listar a busca de um carro por ID na rota GET `/cars/:id`', async function () {
    sinon.stub(Model, 'findOne').resolves(carsWithID);

    const service = new CarService();
    const result = await service.getCarById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(carsWithID);
  });

  it(`Se é possivel retornar um erro 
  caso a busca de um carro por ID seja inválida na rota GET '/cars/:id'`, async function () {
    sinon.stub(Model, 'findOne').resolves({});
    try {
      const service = new CarService();
      await service.getCarById(carsWithID.id as string);
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });

  it('Se é possivel atualizar um carro pelo  na rota PUT \'/cars/:id\'', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carsWithID);
    
    const service = new CarService();
    const result = await service.updateCarById('634852326b35b59438fbea2f', carsWithoutID);

    expect(result).to.be.deep.equal(carsWithID);
  });

  it(`Se é possivel retornar um erro caso o ID 
  seja inválido ao tentar  atualizar um carro pelo  na rota PUT '/cars/:id'`, async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves({});

    try {
      const service = new CarService();
      await service.updateCarById('634852326b35b59438fbea2f', carsWithoutID);
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });
  it('Se é possivel deletar um carro pelo  na rota DELETE \'/cars/:id\'', async function () {
    const outputCar = new Car(carsWithoutID);

    sinon.stub(Model, 'create').resolves(outputCar);
    sinon.stub(Model, 'deleteOne').resolves({ acknowledged: true, deletedCount: 1 });
    
    const service = new CarService();
    const result = await 
    service.deleteCarById('634852326b35b59438fbea2f');
    expect(result).to.be.deep.equal(true);
  });

  it(`Se é possivel retornar uma menssagem caso o ID seja inválido 
  ao tentar  deletar um carro pelo  na rota DELETE '/cars/:id'`, async function () {
    sinon.stub(Model, 'deleteOne').resolves({ acknowledged: false, deletedCount: 0 });

    try {
      const service = new CarService();
      await service.deleteCarById('634852326b35b59438fbea2f');
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});