import { container } from 'tsyringe';
import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider)
};

// registerInstance, pois o serviço precisa ser iniciado em conjunto com a Aplicação
container.registerInstance<IMailProvider>(
        "MailProvider",
        mailProvider[process.env.MAIL_PROVIDER]
);