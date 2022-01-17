"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenController = void 0;

var _tsyringe = require("tsyringe");

var _RefreshTokenUseCase = require("./RefreshTokenUseCase");

class RefreshTokenController {
  async handle(request, response) {
    // Posso receber o Token pelo Body, Header ou QueryParam
    const token = request.body.token || request.headers["x-acess-token"] || request.query.token;

    const refreshTokenUseCase = _tsyringe.container.resolve(_RefreshTokenUseCase.RefreshTokenUseCase);

    const refreshToken = await refreshTokenUseCase.execute(token);
    return response.json(refreshToken);
  }

}

exports.RefreshTokenController = RefreshTokenController;
;