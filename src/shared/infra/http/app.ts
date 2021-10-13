import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';

import  '../typeorm';
import '@shared/container'

import { router } from '@shared/infra/http/routes';
import swaggerConfig from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';


const app = express();
app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    };
    console.log(err)
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}.`
    });
});

export { app };
