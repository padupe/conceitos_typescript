"use strict";

var _AppError = require("@shared/errors/AppError");

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthUserUseCase = require("./AuthUserUseCase");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayJSDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJSDateProvider");

let authUserUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayJSDateProvider.DayJSDateProvider();
    authUserUseCase = new _AuthUserUseCase.AuthUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able to authenticate an user", async () => {
    const newUser = {
      name: "User Test",
      email: "email@test.com",
      password: "pass123",
      driver_license: "01020304"
    };
    await createUserUseCase.execute(newUser);
    const result = await authUserUseCase.execute({
      email: newUser.email,
      password: newUser.password
    });
    expect(result).toHaveProperty('token');
  });
  it("Should not be able to authenticate an non existent user", async () => {
    await expect(authUserUseCase.execute({
      email: "false@email.com",
      password: "falsepass"
    })).rejects.toEqual(new _AppError.AppError('User or Password Incorrect!', 401));
  });
  it("Should not be able to authenticate with incorrect password", async () => {
    const failUser = {
      name: "Fail User",
      email: "failed@email.com",
      password: "fail123",
      driver_license: "04030201"
    };
    await createUserUseCase.execute(failUser);
    await expect(authUserUseCase.execute({
      email: failUser.email,
      password: "errorpass"
    })).rejects.toEqual(new _AppError.AppError('User or Password Incorrect!', 401));
  });
});