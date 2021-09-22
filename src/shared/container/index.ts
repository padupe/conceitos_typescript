import { container } from 'tsyringe';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificatonsRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

// ISpecificationRepository
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

// IUserRepository
container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);