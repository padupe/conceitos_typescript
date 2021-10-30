import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from 'uuid';

@injectable()
class SendForgotPasswordMailUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){}

    async execute(email: string) {

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exists!')
        };

        const tokenEmail = uuidv4();

        await this.usersTokensRepository.create({
            refresh_token: tokenEmail,
            user_id: user.id,
            expires_date:
        })

    };

};

export { SendForgotPasswordMailUseCase };