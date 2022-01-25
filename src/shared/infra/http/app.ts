import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';
import cors from "cors";

import  '../typeorm';
// Não esquecer de realizar o import do Container [TSyringe]
import '@shared/container'

import { router } from '@shared/infra/http/routes';
import swaggerConfig from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';
import upload from '@config/upload';


const app = express();
app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));

// Utilizado para verificar o "endereço" que os arquivos estãos endo salvos LOCALMENTE
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(cors())
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
