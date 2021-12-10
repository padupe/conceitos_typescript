import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
};

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('DayJSDateProvider')
        private dateProvider: IDateProvider,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
    ) {}

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

        const minHoursRental = 24;

        const carUnavailable = await this.rentalsRepository.findRentalOpenByCar(car_id);

        if(carUnavailable) {
            throw new AppError('Car is unavailable!')
        };

        const userStatusRental = await this.rentalsRepository.findRentalOpenByUser(user_id);

        if(userStatusRental) {
            throw new AppError('There is a rental is progress for user!')
        };

        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if(compare < minHoursRental) {
            throw new AppError('Invalid return time!')    
        }

        const newRental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,            
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return newRental;
    };
};

export { CreateRentalUseCase };