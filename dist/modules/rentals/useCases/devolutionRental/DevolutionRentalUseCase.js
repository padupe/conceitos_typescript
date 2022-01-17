"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUseCase = void 0;

var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");

var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("@shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

;
let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RentalsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DayJSDateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUseCase {
  constructor(rentalsRepository, carsRepository, dateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    id,
    user_id
  }) {
    const minDaily = 1; // Localizar o id do Aluguel

    const findRental = await this.rentalsRepository.findById(id);
    const findCar = await this.carsRepository.findById(findRental.car_id);

    if (!findRental) {
      throw new _AppError.AppError('Rental does not exists!');
    }

    ; // Verificar o Tempo do Aluguel

    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(findRental.start_date, dateNow);

    if (daily <= 0) {
      daily = minDaily;
    }

    ; // Verificar o Tempo de Atraso

    const delay = this.dateProvider.compareInDays(dateNow, findRental.expected_return_date); // Calcular Valor do Aluguel

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * findCar.fine_amount;
      total = calculate_fine;
    }

    ;
    total += daily * findCar.daily_rate;
    findRental.end_date = dateNow;
    findRental.total = total;
    await this.rentalsRepository.create(findRental);
    await this.carsRepository.updateAvailable(findCar.id, true);
    return findRental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;
;