import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

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
    refresh_token: string;
}

@injectable()
class AuthUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayJSDateProvider")
        private dayJSDateProvider: IDateProvider
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const { secret_token, expires_in_token, secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth;

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

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const refreshToken = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });

        const refreshTokenExpiresDate = this.dayJSDateProvider.addDays(expires_refresh_token_days);

        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: refreshTokenExpiresDate,
            refresh_token: refreshToken
        });

        const returnToken: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token: refreshToken
        };

        return returnToken;
    }
}

export { AuthUserUseCase };