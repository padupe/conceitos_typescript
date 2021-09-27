import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const usersRepository = new UsersRepository();
    const verifyUser = await usersRepository.findById(id);

    if (!verifyUser.isAdmin) {
        throw new AppError("User insn't Admin!")
    }

    return next();
}