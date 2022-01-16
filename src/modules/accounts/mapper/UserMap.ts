import { User } from "../infra/typeorm/entities/User";



class UserMap {

    static toDTO({
        id,
        name,
        email,
        avatar,
        driver_license
    }: User): IUsersResponseDTO{}

};

export { UserMap };