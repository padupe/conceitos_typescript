"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRoutes = void 0;

var _express = require("express");

var _AuthUserController = require("@modules/accounts/useCases/auth/AuthUserController");

var _RefreshTokenController = require("@modules/accounts/useCases/refreshToken/RefreshTokenController");

const authRoutes = (0, _express.Router)();
exports.authRoutes = authRoutes;
const authUserController = new _AuthUserController.AuthUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
authRoutes.post("/sessions", authUserController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);