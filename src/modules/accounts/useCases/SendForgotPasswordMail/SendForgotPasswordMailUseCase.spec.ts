import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJSDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJSDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayJSDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        )
    })

    it("Should be able to send a forgot password mail to user", async () => {

        //jest.spyOn() -> Função do JEST para ficar espiando ("de olho") em algo
        const sendEmail = jest.spyOn(mailProvider, "sendMail")

        await usersRepositoryInMemory.create({
            driver_license: "635214",
            email: "usertest@test.com",
            name: "John Foobar",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("usertest@test.com");

        expect(sendEmail).toHaveBeenCalled();
    });

    it("Should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("fail@mail.com.br")
        ).rejects.toEqual(new AppError("User does not exists!"))
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