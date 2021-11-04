import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

interface IRequest {
    token: string;
    password: string;
};

@injectable()
class ResetPasswordUserUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject( "DayJSDateProvider")
        private dateProvider: IDateProvider,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){};

    async execute({ token, password }: IRequest): Promise<void> {

        const userToken = await this.usersTokensRepository.findByRefreshToken(token);

        // Verifica se o Token informado é válido
        if(!userToken) {
            throw new AppError('Token Invalid', 404);
        };

        // Verifica se o Token não expirou
        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
            throw new AppError('Token Expired', 401);
        };

        const user = await this.usersRepository.findById(userToken.id);

        // Realiza a Criptografia da NOVA SENHA
        user.password = await hash(password, 10);

        // Realiza o Update do User
        await this.usersRepository.create(user);

        // Deleta o Token enviado por email, para evitar falhas de segurança
        await this.usersTokensRepository.deleteById(userToken.id);
    };
};

export { ResetPasswordUserUseCase };