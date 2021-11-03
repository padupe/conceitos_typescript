import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from 'uuid';

@injectable()
class SendForgotPasswordMailUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayJSDateProvider")
        private dayJSDateProvider: IDateProvider,

        @inject( "EtherealMailProvider")
        private mailProvider: IMailProvider
    ){}

    async execute(email: string): Promise<void> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exists!')
        };

        const tokenEmail = uuidv4();

        const expiresHours = this.dayJSDateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: tokenEmail,
            user_id: user.id,
            expires_date: expiresHours
        });

        await this.mailProvider.sendMail(email, "Recuperação de Senha", `O link para o reset é ${tokenEmail}`);
    };
};

export { SendForgotPasswordMailUseCase };