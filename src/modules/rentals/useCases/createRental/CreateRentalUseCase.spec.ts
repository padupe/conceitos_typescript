import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it('Should be able to create a new rental', async () => {

        const newRental = await createRentalUseCase.execute({
            user_id: 'User123456',
            car_id: 'Car123456',
            expected_return_date: new Date(),
        });

        expect(newRental).toHaveProperty('id');
        expect(newRental).toHaveProperty('start_date');
    });

    it('Should not be able to create a new rental if there is another open to the same user', async () => {

        expect(async() => {
            await createRentalUseCase.execute({
                user_id: 'User123456',
                car_id: 'Car123456',
                expected_return_date: new Date(),
            });
    
            const newRental = await createRentalUseCase.execute({
                user_id: 'User123456',
                car_id: 'Car123456',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create a new rental if there is another open to the same car', async () => {

        expect(async() => {
            await createRentalUseCase.execute({
                user_id: 'User7891011',
                car_id: 'CarBlock',
                expected_return_date: new Date(),
            });
    
            const newRental = await createRentalUseCase.execute({
                user_id: 'User123456',
                car_id: 'CarBlock',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})