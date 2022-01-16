import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJSDateProvider } from './DateProvider/implementations/DayJSDateProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
    "DayJSDateProvider",
    DayJSDateProvider
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.DISK]
);