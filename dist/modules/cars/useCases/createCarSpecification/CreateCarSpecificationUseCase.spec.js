"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationRepositoryInMemory = require("@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationRepositoryInMemory.SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("Should not to be able to add a new specification to a non-existente car", async () => {
    const car_id = '1234';
    const specifications_id = ["5678"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError('Car does not exists!'));
  });
  it("Should be able to add a new specification to the car", async () => {
    const newCar = await carsRepositoryInMemory.create({
      name: "Car Test Create Specification",
      description: "Description Car Test",
      daily_rate: 100,
      license_plate: "ABC1D34",
      fine_amount: 60,
      brand: "Brand Test",
      category_id: "CategoryID"
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: "Test",
      name: "Name Test"
    });
    const specifications_id = [specification.id];
    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: newCar.id,
      specifications_id
    });
    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBe(1);
  });
});