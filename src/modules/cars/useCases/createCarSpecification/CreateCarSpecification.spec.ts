import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;


describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    })

    it("Should not to be able to add a new specification to a non-existente car", async () => {

        expect(async() => {
            const car_id = '1234';
            const specifications_id = ["5678"];

            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a new specification to the car", async () => {

        const newCar = await carsRepositoryInMemory.create({
            name: "Car Test Create Specification",
            description: "Description Car Test",
            daily_rate: 100,
            license_plate: "ABC1D34",
            fine_amount: 60,
            brand: "Brand Test",
            category_id: "CategoryID"
        })

        const specification = await specificationsRepositoryInMemory.create({
            description: "Test",
            name: "Name Test"
        });

        const specifications_id = [specification.id];

        const specificationsCar = await createCarSpecificationUseCase.execute({ car_id: newCar.id, specifications_id });

        expect(specificationsCar).toHaveProperty("specifications");
        expect(specificationsCar.specifications.length).toBe(1);
    });

});