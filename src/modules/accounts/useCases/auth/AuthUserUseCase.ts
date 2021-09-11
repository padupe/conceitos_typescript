import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    password: string;
};

interface IResponse{
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        //Verificar se o usuário existe
        const user = await this.usersRepository.findByEmail(email);
        if(!user) {
            throw new Error("User or Password Incorrect!")
        }

        //Verificar se a senha informada está correta
        const verifyPass = await compare(password, user.password);
        if(!verifyPass){
            throw new Error("User or Password Incorrect!")
        }

        const token = sign({}, "IgniteRocketSeat", {
            subject: user.id,
            expiresIn: "1d"
        });

        return {
            user,
            token
        };
    }
}

export { AuthUserUseCase };