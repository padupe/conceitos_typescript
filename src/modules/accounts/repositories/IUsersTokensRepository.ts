import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";


class IUsersTokensRepository {

    create({ user_id, expires_date, refresh_token}: ICreateUserTokenDTO): Promise<UserTokens>;

};

export { IUsersTokensRepository };