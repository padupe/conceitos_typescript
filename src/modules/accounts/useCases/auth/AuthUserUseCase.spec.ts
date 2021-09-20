import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
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

    
});