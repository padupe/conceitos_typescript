"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _bcrypt = require("bcrypt");

var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");

var _AppError = require("@shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    password,
    email,
    driver_license
  }) {
    // Verificação de e-mail já cadastrado na base
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new _AppError.AppError("User already exists!");
    } // Função para criptografar a senha do usuário


    const passHash = await (0, _bcrypt.hash)(password, 10);
    await this.usersRepository.create({
      name,
      password: passHash,
      email,
      driver_license
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;
;