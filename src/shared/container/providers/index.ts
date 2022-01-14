import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJSDateProvider } from './DateProvider/implementations/DayJSDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
    "DayJSDateProvider",
    DayJSDateProvider
);

// registerInstance, pois o serviço precisa ser iniciado em conjunto com a Aplicação
// Código comentado pois não estava funcionando correatamente nas linhas 14 e 17.
// container.registerInstance<IMailProvider>(
container.registerSingleton<IMailProvider>(
    "EtherealMailProvider",
    // new EtherealMailProvider()
    EtherealMailProvider
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.DISK]
);