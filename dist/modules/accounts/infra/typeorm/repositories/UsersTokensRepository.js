"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _typeorm = require("typeorm");

var _UserTokens = require("../entities/UserTokens");

class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_UserTokens.UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }) {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    });
    await this.repository.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const findUser = await this.repository.findOne({
      user_id,
      refresh_token
    });
    return findUser;
  }

  async deleteById(id) {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token) {
    const findUser = await this.repository.findOne({
      refresh_token
    });
    return findUser;
  }

}

exports.UsersTokensRepository = UsersTokensRepository;
;