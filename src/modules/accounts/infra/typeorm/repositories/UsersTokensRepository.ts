import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {

    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }
;

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            user_id,
            expires_date,
            refresh_token,
        });

        await this.repository.save(userToken);

        return userToken;
    };

    async findByUserId(user_id: string): Promise<UserTokens[]> {
        const findUsers = await this.repository.find({user_id});
        return findUsers;
    };
};

export { UsersTokensRepository };