"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthUserController = void 0;

var _tsyringe = require("tsyringe");

var _AuthUserUseCase = require("./AuthUserUseCase");

class AuthUserController {
  async handle(request, response) {
    const {
      email,
      password
    } = request.body;

    const authUserUseCase = _tsyringe.container.resolve(_AuthUserUseCase.AuthUserUseCase);

    const authInfo = await authUserUseCase.execute({
      email,
      password
    });
    return response.json(authInfo);
  }

}

exports.AuthUserController = AuthUserController;