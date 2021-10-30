import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { verify } from 'jsonwebtoken';
import { inject } from 'tsyringe';

interface IPayload {
    sub: string;
};

class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){}

    execute(token: string) {
        const decode = verify(token, auth.secret_refresh_token) as IPayload;

        const user_id = decode.sub;

        await this.usersTokensRepository.findByUserId(user_id)
    };
};

export { RefreshTokenUseCase };