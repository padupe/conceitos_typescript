import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImageRepository {

    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    };

    async create(car_id: string, image_name: string): Promise<CarImage> {
        throw new Error("Method not implemented.");
    };
    
};

export { CarsImagesRepository };