import redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { Request, Response,NextFunction } from "express";
import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 10, // 10 requests
    duration: 1, // 1 segundo por IP
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void>{
    try {
        await limiter.consume(request.ip);

        return next();
    } catch (error) {
        throw new AppError("Too many requests", 429);
    };
};