"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id
  }) {
    const newCar = new _Car.Car();
    Object.assign(newCar, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id
    });
    this.cars.push(newCar);
    return newCar;
  }

  async findByLicencePlate(license_plate) {
    return this.cars.find(findCar => findCar.license_plate === license_plate);
  }

  async listAvailable(category_id, brand, name) {
    const listCars = this.cars.filter(carAvailable => {
      if (carAvailable.available === true || category_id && carAvailable.category_id === category_id || brand && carAvailable.brand === brand || name && carAvailable.name === name) {
        return carAvailable;
      }

      return null;
    });
    return listCars;
  }

  async findById(id) {
    return this.cars.find(findCarId => findCarId.id === id);
  }

  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;
;