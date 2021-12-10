import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";



class CarsRepositoryInMemory implements ICarsRepository {
           
    cars: Car[] = [];

    async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id, id}: ICreateCarDTO): Promise<Car> {
        
        const newCar = new Car();

        Object.assign(newCar, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            id,
        });

        this.cars.push(newCar);

        return newCar;
    };
    
    async findByLicencePlate(license_plate: string): Promise<Car> {
        return this.cars.find((findCar) => findCar.license_plate === license_plate);
    };

    async listAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        const listCars = this.cars.filter((carAvailable) => {
            if (
                carAvailable.available === true || ((category_id && carAvailable.category_id === category_id) || (brand && carAvailable.brand === brand) || (name && carAvailable.name === name))
            ) {
                return carAvailable
            }
            return null;
            });
        return listCars;
    };

    async findById(id: string): Promise<Car> {
        return this.cars.find((findCarId) => findCarId.id === id);
    };

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id);
        this.cars[findIndex].available = available;
    };
};

export { CarsRepositoryInMemory };