import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";


interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicencePlate(license_plate: string): Promise<Car>;
    listAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailabel(id: string): Promise<Car>;
};

export { ICarsRepository };