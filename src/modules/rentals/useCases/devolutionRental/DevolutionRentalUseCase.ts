import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
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

    async execute({ id, user_id }: IRequest): Promise<Rental> {

        const minDaily = 1;

        // Localizar o id do Aluguel
        const findRental = await this.rentalsRepository.findById(id);
        const findCar = await this.carsRepository.findById(id);

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

        // Verificar o Tempo de Atraso
        const delay = this.dateProvider.compareInDays(
            dateNow,
            findRental.expected_return_date
        );

        // Calcular Valor do Aluguel
        let total = 0;

        if(delay > 0) {
            const calculate_fine = delay * findCar.fine_amount;
            total = calculate_fine;
        };

        total += daily * findCar.daily_rate;

        findRental.end_date = dateNow;
        findRental.total = total;

        await this.rentalsRepository.create(findRental);
        await this.carsRepository.updateAvailable(findCar.id, true);

        return findRental;
    };
};

export { DevolutionRentalUseCase };