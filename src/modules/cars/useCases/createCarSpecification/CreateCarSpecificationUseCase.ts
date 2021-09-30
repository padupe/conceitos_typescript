
interface IRequest {
    car_id: string;
    specifications_id: string[];
};

class CreateCarSpecificationUseCase {

    async execute({ car_id, specifications_id }: IRequest): Promise<void> {

    };
};

export { CreateCarSpecificationUseCase };