import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        // Posso receber o Token pelo Body, Header ou QueryParam
        const token = request.body.token || request.headers["x-acess-token"] || request.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const refreshToken = await refreshTokenUseCase.execute(token);

        return response.json(refreshToken);
    };
};

export { RefreshTokenController };