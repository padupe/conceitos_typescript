import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { inject } from "tsyringe";



class ListRentalsByUserUseCase {

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: RentalsRepository
    ){};


    async execute(user_id: string): Promise<Rental> {
        const findRentalsByUser = await this.rentalsRepository.findByUserId(user_id);
        return findRentalsByUser;
    };
};

export { ListRentalsByUserUseCase };