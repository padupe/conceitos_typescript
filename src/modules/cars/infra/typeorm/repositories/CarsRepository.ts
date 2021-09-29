import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    };

    async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id}: ICreateCarDTO): Promise<Car> {
        const newCar = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        });

        await this.repository.save(newCar);

        return newCar;
    };

    async findByLicencePlate(license_plate: string): Promise<Car> {
        const findCar = await this.repository.findOne({ license_plate });

        return findCar;
    };

    async listAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository
        .createQueryBuilder("car")
        .where("available = :available", { available: true });

        if(category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id });
        };

        if(brand) {
            carsQuery.andWhere("brand = :brand", { brand });
        };

        if(name) {
            carsQuery.andWhere("name = :name", { name });
        };

        const listCarsAvailable = await carsQuery.getMany();

        return listCarsAvailable;
    };
    
};

export { CarsRepository };