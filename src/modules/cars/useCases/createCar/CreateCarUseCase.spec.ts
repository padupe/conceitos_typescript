import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const newCar = await createCarUseCase.execute({
            name: "Car Test",
            description: "Description Car Test",
            daily_rate: 100,
            license_plate: "ABC1D34",
            fine_amount: 60,
            brand: "Brand Test",
            category_id: "CategoryID"
        });

        expect(newCar).toHaveProperty('id');
    });

    it("Should not be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute({
            name: "Car Test 1",
            description: "Description Car Test",
            daily_rate: 100,
            license_plate: "ABC1D34",
            fine_amount: 60,
            brand: "Brand Test",
            category_id: "CategoryID"
        });

        await expect(createCarUseCase.execute({
                name: "Car Test 2",
                description: "Description Car Test",
                daily_rate: 100,
                license_plate: "ABC1D34",
                fine_amount: 60,
                brand: "Brand Test",
                category_id: "CategoryID"
            })
        ).rejects.toEqual(new AppError('Car already exists!'));
    })

    it("Should be able to create a car wiht available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Avilable",
            description: "Description Car Test",
            daily_rate: 100,
            license_plate: "EFG5H78",
            fine_amount: 60,
            brand: "Brand Test",
            category_id: "CategoryID"
        });

        expect(car.available).toBe(true);

    })
});