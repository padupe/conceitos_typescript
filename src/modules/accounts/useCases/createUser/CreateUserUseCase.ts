import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){};

    async execute({name, password, email, driver_license}: ICreateUserDTO): Promise<void> {

        // Verificação de e-mail já cadastrado na base
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }

        // Função para criptografar a senha do usuário
        const passHash = await hash(password, 10);

        await this.usersRepository.create({
            name,
            password: passHash,
            email,
            driver_license
        });
    }
};

export { CreateUserUseCase };