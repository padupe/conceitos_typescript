import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Car Test",
            description: "Description Car Test",
            daily_rate: 100,
            license_plate: "ABC1D34",
            fine_amount: 60,
            brand: "Brand Test",
            category_id: "CategoryID"
        });
    });
});