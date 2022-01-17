"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayJSDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJSDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayJSDateProvider.DayJSDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send a forgot password mail to user", async () => {
    //jest.spyOn() -> Função do JEST para ficar espiando ("de olho") em algo
    const sendEmail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "635214",
      email: "usertest@test.com",
      name: "John Foobar",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("usertest@test.com");
    expect(sendEmail).toHaveBeenCalled();
  });
  it("Should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("fail@mail.com.br")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "684536",
      email: "usertest2@test.com",
      name: "William Defoe",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("usertest2@test.com");
    expect(generateTokenMail).toBeCalled();
  });
});