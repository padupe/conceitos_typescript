import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificatonsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_id: string[];
};

class CreateCarSpecificationUseCase {

    constructor(
        // @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        private specificationsRepository: ISpecificationsRepository
    ){};

    async execute({ car_id, specifications_id }: IRequest): Promise<void> {

        const findCar = await this.carsRepository.findById(car_id);

        if(!findCar) {
            throw new AppError('Car does not exists!')
        };

        const newSpecifications = await this.specificationsRepository.findByIds(specifications_id);

        findCar.specifications = newSpecifications;

        await this.carsRepository.create(findCar);
        console.log(findCar);
    };
};

export { CreateCarSpecificationUseCase };