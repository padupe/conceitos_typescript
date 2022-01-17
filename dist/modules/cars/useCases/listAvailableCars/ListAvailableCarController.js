"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailableCarUseCase = require("./ListAvailableCarUseCase");

class ListAvailableCarController {
  async handle(request, response) {
    const {
      category_id,
      brand,
      name
    } = request.query;

    const listAvailableCarsUseCase = _tsyringe.container.resolve(_ListAvailableCarUseCase.ListAvailableCarsUseCase);

    const listCars = await listAvailableCarsUseCase.execute({
      category_id: category_id,
      brand: brand,
      name: name
    });
    return response.status(200).json(listCars);
  }

}

exports.ListAvailableCarController = ListAvailableCarController;
;