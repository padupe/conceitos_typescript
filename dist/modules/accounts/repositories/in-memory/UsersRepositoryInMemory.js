"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;

var _User = require("../../infra/typeorm/entities/User");

class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async create({
    name,
    email,
    password,
    driver_license
  }) {
    const newUser = new _User.User();
    Object.assign(newUser, {
      name,
      email,
      password,
      driver_license
    });
    this.users.push(newUser);
  }

  async findByEmail(email) {
    return this.users.find(findUser => findUser.email === email);
  }

  async findById(id) {
    return this.users.find(findUser => findUser.id === id);
  }

}

exports.UsersRepositoryInMemory = UsersRepositoryInMemory;
;