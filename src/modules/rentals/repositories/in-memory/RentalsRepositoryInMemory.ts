import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";



class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async findRentalOpenByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && rental.end_date === null)
    };

    async findRentalOpenByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && rental.end_date === null)
    };

    async create({car_id, user_id, expected_return_date}: ICreateRentalDTO): Promise<Rental> {
        
        const newRental = new Rental();

        Object.assign(newRental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
        });

        this.rentals.push(newRental);

        return newRental;
    }


};

export { RentalsRepositoryInMemory };