import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository{

    private repository: Repository<Rental>;

    constructor(){
        this.repository = getRepository(Rental);
    }
;

    async findRentalOpenByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: { car_id, end_date: null },
        });
        return openByCar;
    };

    async findRentalOpenByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
            where: { user_id, end_date: null },
        });
        return openByUser;
    };

    async create({ car_id, user_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
        const newRental = this.repository.create({
            user_id,
            car_id,
            expected_return_date,
            id,
            end_date,
            total,
        });

        this.repository.save(newRental);

        return newRental;
    };

    async findById(id: string): Promise<Rental> {
        const findRental = await this.repository.findOne(id);
        return findRental;
    };
};

export { RentalsRepository };