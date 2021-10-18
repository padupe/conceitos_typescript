import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest {
    id: string;
    user_id: string;
};

class DevolutionRentalUseCase {

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DayJSDateProvider')
        private dateProvider: IDateProvider,
    ){};

    async handle({ id, user_id }: IRequest) {

        const minDaily = 1;

        // Localizar o id do Aluguel
        const findRental = await this.rentalsRepository.findById(id);

        if(!findRental) {
            throw new AppError('Rental does not exists!')
        };

        // Verificar o Tempo do Aluguel
        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            findRental.start_date,
            dateNow,
        );

        if(daily <= 0) {
            daily = minDaily;
        };

        const delay = this.dateProvider.compareInDays(
            dateNow,
            findRental.expected_return_date
        );

        if(diffInHours < )
    };

};

export { DevolutionRentalUseCase };