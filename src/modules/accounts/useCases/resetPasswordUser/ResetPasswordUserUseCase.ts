import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    token: string;
    password: string;
};

@injectable()
class ResetPasswordUserUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){};

    async execute({ token, password }: IRequest) {

        const userToken = await this.usersTokensRepository.findByRefreshToken(token);

        if(!userToken) {
            throw new AppError('Token Invalid', 404);
        }
    };
};

export { ResetPasswordUserUseCase };