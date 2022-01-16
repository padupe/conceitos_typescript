import aws from "aws-sdk";
import fs from 'fs';
import Handlebars from "handlebars";
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION,
            })
        });
    };

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

        const templateFileContente = fs.readFileSync(path).toString('utf-8');

        const templateParse = Handlebars.compile(templateFileContente);

        const templateHTML = templateParse(variables);

        await this.client.sendMail({
            to,
            /*
            É necessário criar um Domínio Próprio (Pago)
            Aqui estou apenas setando um e-mail existente para exemplificar e proseeguir com os estudos
            */
            from: "Rentx <peixoto.pauloeduardo@gmail.com",
            subject,
            html: templateHTML,
        });
    };    
};

export { SESMailProvider };