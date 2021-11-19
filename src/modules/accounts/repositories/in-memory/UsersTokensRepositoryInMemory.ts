import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";



class UsersTokensRepositoryInMemory implements IUsersTokensRepository {

    usersTokens: UserTokens[] = [];

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        
        const userToken = new UserTokens();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id
        });

        this.usersTokens.push(userToken);

        return userToken;
    };

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersTokens.find((user) => user.user_id === user_id && user.refresh_token === refresh_token);

        return userToken;
    };

    deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        throw new Error("Method not implemented.");
    }

};

export { UsersTokensRepositoryInMemory };