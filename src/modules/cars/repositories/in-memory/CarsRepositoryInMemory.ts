import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";



class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id}: ICreateCarDTO): Promise<void> {
        
        const newCar = new Car();

        Object.assign(newCar, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(newCar);
    }

};

export { CarsRepositoryInMemory };