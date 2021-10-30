import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";


interface IUsersTokensRepository {
    create({ user_id, expires_date, refresh_token}: ICreateUserTokenDTO): Promise<UserTokens>;
    findByUserId(user_id: string): Promise<UserTokens[]>;
};

export { IUsersTokensRepository };