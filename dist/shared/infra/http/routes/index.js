"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _auth = require("./auth.routes");

var _categories = require("./categories.routes");

var _specifications = require("./specifications.routes");

var _user = require("./user.routes");

var _cars = require("./cars.routes");

var _rentals = require("./rentals.routes");

var _password = require("./password.routes");

const router = (0, _express.Router)();
exports.router = router;
router.use('/categories', _categories.categoriesRoutes);
router.use('/specifications', _specifications.specificationsRoutes);
router.use('/users', _user.usersRoutes);
router.use('/cars', _cars.carsRoutes);
router.use('/rentals', _rentals.rentalsRoutes);
router.use('/password', _password.passwordRoutes);
router.use(_auth.authRoutes);