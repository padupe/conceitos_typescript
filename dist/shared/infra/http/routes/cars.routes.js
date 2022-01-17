"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@config/upload"));

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _CreateCarController = require("@modules/cars/useCases/createCar/CreateCarController");

var _ListAvailableCarController = require("@modules/cars/useCases/listAvailableCars/ListAvailableCarController");

var _CreateCarSpecificationController = require("@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _UploadCarImageController = require("@modules/cars/useCases/uploadCarImage/UploadCarImageController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const uploadImageCar = (0, _multer.default)(_upload.default);
const createCarController = new _CreateCarController.CreateCarController();
const listAvalaibleController = new _ListAvailableCarController.ListAvailableCarController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImageController = new _UploadCarImageController.UploadCarImageController();
carsRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvalaibleController.handle);
carsRoutes.post('/specifications/:id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post('/images/:id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, uploadImageCar.array('images'), uploadCarImageController.handle);