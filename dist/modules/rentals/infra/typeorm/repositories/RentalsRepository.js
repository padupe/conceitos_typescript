"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async findRentalOpenByCar(car_id) {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return openByCar;
  }

  async findRentalOpenByUser(user_id) {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return openByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total
  }) {
    const newRental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total
    });
    this.repository.save(newRental);
    return newRental;
  }

  async findById(id) {
    const findRental = await this.repository.findOne(id);
    return findRental;
  }

  async findByUser(user_id) {
    const findRentals = await this.repository.find({
      where: {
        user_id
      },
      relations: ['car']
    });
    return findRentals;
  }

}

exports.RentalsRepository = RentalsRepository;
;