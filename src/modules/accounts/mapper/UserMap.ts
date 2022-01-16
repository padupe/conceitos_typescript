import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";
import { instanceToInstance } from "class-transformer";

class UserMap {

    static toDTO({
        id,
        name,
        email,
        avatar,
        driver_license,
        getAvatarURL
    }: User): IUserResponseDTO {

        const user = instanceToInstance({
            id,
            name,
            email,
            avatar,
            driver_license,
            getAvatarURL
        });
        return user;
    };
};

export { UserMap };