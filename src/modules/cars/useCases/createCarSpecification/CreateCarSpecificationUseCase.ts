import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_id: string[];
};

@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('SpecificationsRepository')
        private specificationRepository: ISpecificationsRepository
    ){};

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {

        const findCar = await this.carsRepository.findById(car_id);

        if(!findCar) {
            throw new AppError('Car does not exists!')
        };

        const newSpecifications = await this.specificationRepository.findByIds(specifications_id);

        findCar.specifications = newSpecifications;

        await this.carsRepository.create(findCar);
        
        return findCar;
    };
};

export { CreateCarSpecificationUseCase };