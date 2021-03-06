import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthUserUseCase } from "./AuthUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJSDateProvider";

let authUserUseCase: AuthUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJSDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayJSDateProvider();
        authUserUseCase = new AuthUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to authenticate an user", async () => {
        const newUser: ICreateUserDTO = {
            name: "User Test",
            email: "email@test.com",
            password: "pass123",
            driver_license: "01020304"
        };

        await createUserUseCase.execute(newUser);

        const result = await authUserUseCase.execute({
            email: newUser.email,
            password: newUser.password,
        });

        expect(result).toHaveProperty('token');
    });

    it("Should not be able to authenticate an non existent user", async () => {
        await expect(authUserUseCase.execute({
                email: "false@email.com",
                password: "falsepass",
            })
        ).rejects.toEqual(new AppError('User or Password Incorrect!', 401));
    });

    it("Should not be able to authenticate with incorrect password", async () => {
        const failUser: ICreateUserDTO = {
            name: "Fail User",
            email: "failed@email.com",
            password: "fail123",
            driver_license: "04030201",
        };

        await createUserUseCase.execute(failUser);

        await expect(authUserUseCase.execute({
                email: failUser.email,
                password: "errorpass",
            })
        ).rejects.toEqual(new AppError('User or Password Incorrect!', 401));
    });    
});