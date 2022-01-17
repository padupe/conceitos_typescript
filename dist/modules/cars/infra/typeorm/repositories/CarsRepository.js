"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const newCar = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    await this.repository.save(newCar);
    return newCar;
  }

  async findByLicencePlate(license_plate) {
    const findCar = await this.repository.findOne({
      license_plate
    });
    return findCar;
  }

  async listAvailable(category_id, brand, name) {
    const carsQuery = await this.repository.createQueryBuilder("car").where("available = :available", {
      available: true
    });

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", {
        category_id
      });
    }

    ;

    if (brand) {
      carsQuery.andWhere("brand = :brand", {
        brand
      });
    }

    ;

    if (name) {
      carsQuery.andWhere("name = :name", {
        name
      });
    }

    ;
    const listCarsAvailable = await carsQuery.getMany();
    return listCarsAvailable;
  }

  async findById(id) {
    const findCar = await this.repository.findOne(id);
    return findCar;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where('id = :id').setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;
;