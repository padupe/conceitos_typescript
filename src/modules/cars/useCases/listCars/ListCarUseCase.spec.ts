import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it("Should be able to list all available cars", async () => {

        const newCar = await carsRepositoryInMemory.create({
                name: "Car 1",
                description: "Car Description",
                daily_rate: 110.00,
                license_plate: "DEF5H78",
                fine_amount: 80.00,
                brand: "Car_Brand",
                category_id: "category_ID"
        })

        const listCars = await listCarsUseCase.execute();

        expect(listCars).toEqual([newCar]);
    });

    it("Should be able to list all available cars by name")
});