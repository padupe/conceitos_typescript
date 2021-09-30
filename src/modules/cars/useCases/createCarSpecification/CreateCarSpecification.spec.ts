import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;


describe("Create Car Specification", () => {

    beforeEach(() => {
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase();
    })

    it("Should be able to add a new specification to the car", async () => {

        await createCarSpecificationUseCase.execute();
    });

});