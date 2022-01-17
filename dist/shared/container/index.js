"use strict";

var _tsyringe = require("tsyringe");

require("@shared/container/providers");

var _CategoriesRepository = require("@modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _CarsRepository = require("@modules/cars/infra/typeorm/repositories/CarsRepository");

var _CarsImagesRepository = require("@modules/cars/infra/typeorm/repositories/CarsImagesRepository");

var _RentalsRepository = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");

var _UsersTokensRepository = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

// ICategoriesRepository
_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository); // ISpecificationRepository


_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationsRepository.SpecificationsRepository); // IUserRepository


_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository); // ICarRepository


_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository); // ICarsImageRepository


_tsyringe.container.registerSingleton("CarsImagesRepository", _CarsImagesRepository.CarsImagesRepository); // IRentalseRepository


_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository); // IUsersTokensRepository


_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);