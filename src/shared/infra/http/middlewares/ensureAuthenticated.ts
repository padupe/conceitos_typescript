import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";



interface IPayload {
    sub: string;
};

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;
    const usersTokensRepository = new UsersTokensRepository();

    if(!authHeader){
        throw new AppError("Token Missing!", 401)
    };

    // O Bearer será separado do corpo do Token
    // No array abaixo, o Bearer ocupa a posição 0 e o Token a posição 1
    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

        const user = usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);
        if (!user) {
            throw new AppError("User does not exists!", 401)
        };

        request.user = {
            id: user_id
        };

        next();
    } catch {
        throw new AppError("Invalid Token!", 401)
    } 

}