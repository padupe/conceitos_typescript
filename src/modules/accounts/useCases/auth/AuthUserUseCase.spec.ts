import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthUserUseCase } from "./AuthUserUseCase";

let authUserUseCase: AuthUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authUserUseCase = new AuthUserUseCase(usersRepositoryInMemory);
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
        expect(async() => {
            await authUserUseCase.execute({
                email: "false@email.com",
                password: "falsepass",
            }); 
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authentica with incorrect password", async () => {
        expect(async() => {
            const failUser: ICreateUserDTO = {
                name: "Fail User",
                email: "failed@email.com",
                password: "fail123",
                driver_license: "04030201",
            };

            await createUserUseCase.execute(failUser);

            const failedResult = await authUserUseCase.execute({
                email: failUser.email,
                password: "errorpass",
            });
        }).rejects.toBeInstanceOf(AppError);
    });    
});