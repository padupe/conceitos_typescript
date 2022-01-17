"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;

var _Category = require("../../infra/typeorm/entities/Category");

class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }

  async findByName(name) {
    const findCategory = this.categories.find(category => category.name === name);
    return findCategory;
  }

  async list() {
    const showAll = this.categories;
    return showAll;
  }

  async create({
    name,
    description
  }) {
    const createCategory = new _Category.Category();
    Object.assign(createCategory, {
      name,
      description
    });
    this.categories.push(createCategory);
  }

}

exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;
;