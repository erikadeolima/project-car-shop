import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

// const invalidMongoId = 'Invalid mongo id';
const notFound = 'Motorcycle not found';

const motorcycleWithoutID: IMotorcycle = {
  model: 'Honda Cb 400f Hornet',
  year: 2005,
  color: 'Black',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const motorcyclesArray: IMotorcycle[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Black',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
];

const motorcycleWithID: IMotorcycle = {
  id: '634852326b35b59438fbea31',
  model: 'Honda Cb 600f Hornet',
  year: 2011,
  color: 'Orange',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

describe('Testa a camada MotocycleService', function () {
  it('Se é possivel cadastrar uma moto na rota POST `/motorcycles`', async function () {
    const outputMotorcycle = new Motorcycle(motorcycleWithoutID);

    sinon.stub(Model, 'create').resolves(outputMotorcycle);

    const service = new MotorcycleService();
    const result = await service.create(motorcycleWithoutID);

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Se é possivel listar as motos na rota GET `/motorcycles`', async function () {
    sinon.stub(Model, 'find').resolves(motorcyclesArray);

    const service = new MotorcycleService();
    const result = await service.getAllMotorcycles();

    expect(result).to.be.deep.equal(motorcyclesArray);
  });

  it(`Se é possivel listar a busca de uma moto por ID 
  na rota GET '/motorcycles/:id'`, async function () {
    sinon.stub(Model, 'findOne').resolves(motorcycleWithID);

    const service = new MotorcycleService();
    const result = await service.getMotorcycleById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(motorcycleWithID);
  });

  it(`Se é possivel retornar um erro 
  caso a busca de uma moto por ID seja inválida na rota GET '/motorcycles/:id'`, async function () {
    sinon.stub(Model, 'findOne').resolves({});
    try {
      const service = new MotorcycleService();
      await service.getMotorcycleById(motorcycleWithID.id as string);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  it('Se é possivel atualizar uma moto pelo  na rota PUT \'/motorcycles/:id\'', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleWithID);
    
    const service = new MotorcycleService();
    const result = await 
    service.updateMotorcycleById('634852326b35b59438fbea2f', motorcycleWithoutID);

    expect(result).to.be.deep.equal(motorcycleWithID);
  });

  it(`Se é possivel retornar um erro caso o ID seja inválido 
  ao tentar  atualizar uma moto pelo  na rota PUT '/motorcycles/:id'`, async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves({});

    try {
      const service = new MotorcycleService();
      await service.updateMotorcycleById('634852326b35b59438fbea2f', motorcycleWithoutID);
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });

  it('Se é possivel deletar uma moto pelo  na rota DELETE \'/motorcycles/:id\'', async function () {
    const outputMotorcycle = new Motorcycle(motorcycleWithoutID);

    sinon.stub(Model, 'create').resolves(outputMotorcycle);
    sinon.stub(Model, 'deleteOne').resolves({ acknowledged: true, deletedCount: 1 });
    
    const service = new MotorcycleService();
    const result = await 
    service.deleteMotorcycleById('634852326b35b59438fbea2f');
    expect(result).to.be.deep.equal(true);
  });

  it(`Se é possivel retornar uma menssagem caso o ID seja inválido 
  ao tentar  deletar uma moto pelo  na rota DELETE '/motorcycles/:id'`, async function () {
    sinon.stub(Model, 'deleteOne').resolves({ acknowledged: false, deletedCount: 0 });

    try {
      const service = new MotorcycleService();
      await service.deleteMotorcycleById('634852326b35b59438fbea2f');
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});