import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
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

    async execute(token: string) {
        const decode = verify(token, auth.secret_refresh_token) as IPayload;

        const user_id = decode.sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if(!userToken) {
            throw new AppError('Refresh Token does not exists!', 404)
        };

        await this.usersTokensRepository.deleteById(userToken.id)
    };
};

export { RefreshTokenUseCase };