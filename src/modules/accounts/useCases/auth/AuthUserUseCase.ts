import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";

interface IRequest {
    email: string;
    password: string;
};

interface IResponse{
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        //Verificar se o usuário existe
        const user = await this.usersRepository.findByEmail(email);
        if(!user) {
            throw new AppError("User or Password Incorrect!", 401)
        }

        //Verificar se a senha informada está correta
        const verifyPass = await compare(password, user.password);
        if(!verifyPass){
            throw new AppError("User or Password Incorrect!", 401)
        }

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token
        });

        const returnToken: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return returnToken;
    }
}

export { AuthUserUseCase };