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

        const listCars = await listCarsUseCase.execute({});

        expect(listCars).toEqual([newCar]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: "Car 2",
            description: "Car Description",
            daily_rate: 110.00,
            license_plate: "DEF5H78",
            fine_amount: 80.00,
            brand: "Car_Brand_Test",
            category_id: "category_ID"
    })

    const listCarsBrand = await listCarsUseCase.execute({
        brand: "Car_Brand_Test",
    });

    expect(listCarsBrand).toEqual([newCar]); 
    })

    it("Should be able to list all available cars by name", async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: "Car 3",
            description: "Car Description",
            daily_rate: 110.00,
            license_plate: "IJK9M12",
            fine_amount: 80.00,
            brand: "Car_Brand_Test",
            category_id: "category_ID"
    })

    const listCarsName = await listCarsUseCase.execute({
        name: "Car 3",
    });

    expect(listCarsName).toEqual([newCar]); 
    })
});