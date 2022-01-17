"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationRepositoryInMemory = void 0;

var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");

class SpecificationRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description
  }) {
    const newSpecification = new _Specification.Specification();
    Object.assign(newSpecification, {
      name,
      description
    });
    this.specifications.push(newSpecification);
    return newSpecification;
  }

  async findByName(name) {
    return this.specifications.find(findSpecification => findSpecification.name === name);
  }

  async findByIds(ids) {
    const allSpecifications = this.specifications.filter(findSpecifications => ids.includes(findSpecifications.id));
    return allSpecifications;
  }

}

exports.SpecificationRepositoryInMemory = SpecificationRepositoryInMemory;
;