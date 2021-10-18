import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayJSDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJSDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJSDateProvider: DayJSDateProvider;

describe('Create Rental', () => {

    const dayAdd24H = dayjs().add(1, 'day').toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayJSDateProvider = new DayJSDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJSDateProvider, carsRepositoryInMemory);
    });

    it('Should be able to create a new rental', async () => {

        const newRental = await createRentalUseCase.execute({
            user_id: 'User123456',
            car_id: 'Car123456',
            expected_return_date: dayAdd24H,
        });

        expect(newRental).toHaveProperty('id');
        expect(newRental).toHaveProperty('start_date');
    });

    it('Should not be able to create a new rental if there is another open to the same user', async () => {

        expect(async() => {
            await createRentalUseCase.execute({
                user_id: 'User123456',
                car_id: 'Car123456',
                expected_return_date: dayAdd24H,
            });
    
            const newRental = await createRentalUseCase.execute({
                user_id: 'User123456',
                car_id: 'Car123456',
                expected_return_date: dayAdd24H,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create a new rental if there is another open to the same car', async () => {

        expect(async() => {
            await createRentalUseCase.execute({
                user_id: 'User7891011',
                car_id: 'CarBlock',
                expected_return_date: dayAdd24H,
            });
    
            const newRental = await createRentalUseCase.execute({
                user_id: 'User123456',
                car_id: 'CarBlock',
                expected_return_date: dayAdd24H,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create a new rental with invalid return time', async () => {

        expect(async() => {
            await createRentalUseCase.execute({
                user_id: 'User7891011',
                car_id: 'CarBlock',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});