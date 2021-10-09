import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
};

class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<void> {

        const carUnavailable = await this.rentalsRepository.findRentalOpenByCar(car_id);

        if(carUnavailable) {
            throw new AppError('Car is unavailable!')
        };

        const userStatusRental = await this.rentalsRepository.findRentalOpenByUser(user_id);

        if(userStatusRental) {
            throw new AppError('There is a rental is progress for user!')
        }

    };
};

export { CreateRentalUseCase };