"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = require("../shared/errors/AppError");

;

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError("Token Missing!", 401);
  }

  ; // O Bearer será separado do corpo do Token
  // No array abaixo, o Bearer ocupa a posição 0 e o Token a posição 1

  const [, token] = authHeader.split(" ");

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, "IgniteRocketSeat");
    const usersRepository = new _UsersRepository.UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.AppError("User does not exists!", 401);
    }

    ;
    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError("Invalid Token!", 401);
  }
}