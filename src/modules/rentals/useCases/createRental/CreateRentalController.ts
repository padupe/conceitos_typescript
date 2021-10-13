import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";


class CreateRentalController {
    
    async handle(request: Request, response: Response): Response<Rental> {
        const createRentalUseCase = container.resolve(CreateRentalUseCase);

        await createRentalUseCase.execute({
            car_id,
            expected_return_date,
            user_id
        });
    };
};

export { CreateRentalController };