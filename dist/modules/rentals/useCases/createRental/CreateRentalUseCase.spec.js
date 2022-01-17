"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

var _DayJSDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJSDateProvider");

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let dayJSDateProvider;
describe('Create Rental', () => {
  const dayAdd24H = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayJSDateProvider = new _DayJSDateProvider.DayJSDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayJSDateProvider, carsRepositoryInMemory);
  });
  it('Should be able to create a new rental', async () => {
    const newCar = await carsRepositoryInMemory.create({
      name: 'Test Car',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'ABC1E34',
      fine_amount: 40,
      category_id: 'test1234',
      brand: 'Brand Test'
    });
    const newRental = await createRentalUseCase.execute({
      user_id: 'User123456',
      car_id: newCar.id,
      expected_return_date: dayAdd24H
    });
    expect(newRental).toHaveProperty('id');
    expect(newRental).toHaveProperty('start_date');
  });
  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    const newCar = await rentalsRepositoryInMemory.create({
      car_id: 'Car654321',
      expected_return_date: dayAdd24H,
      user_id: 'User123456'
    });
    await expect(createRentalUseCase.execute({
      user_id: 'User123456',
      car_id: 'Car123456',
      expected_return_date: dayAdd24H
    })).rejects.toEqual(new _AppError.AppError('There is a rental is progress for user!'));
  });
  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    const newCar = await rentalsRepositoryInMemory.create({
      car_id: 'CarBlock',
      expected_return_date: dayAdd24H,
      user_id: 'User123456'
    });
    await expect(createRentalUseCase.execute({
      user_id: 'User123456',
      car_id: 'CarBlock',
      expected_return_date: dayAdd24H
    })).rejects.toEqual(new _AppError.AppError('Car is unavailable!'));
  });
  it('Should not be able to create a new rental with invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      user_id: 'User7891011',
      car_id: 'CarBlock',
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError('Invalid return time!'));
  });
});