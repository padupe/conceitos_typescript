import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
};

class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
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

        const expectedReturnFormat = dayjs(expected_return_date).utc().local().format();
        const dateNow = dayjs().utc().local().format();
        const compare = dayjs(expectedReturnFormat).diff(dateNow, "hours");

        if(compare < minHoursRental) {
            throw new AppError('Invalid return time!')    
        }

        const newRental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,            
        });

        return newRental;
    };
};

export { CreateRentalUseCase };