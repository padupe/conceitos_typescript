import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJSDateProvider";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJSDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

describe("Send Forgot Mail", () => {

    beforeEach(() => {
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(

        )
    })

    it("Should be able to send a forgot password mail to user", () => {

    })
})