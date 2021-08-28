import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
};

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {

    };

    async execute({name, description}: IRequest): Promise<void> {
        const categoryValidate = await this.categoriesRepository.findByName(name);
        if (categoryValidate) {
            throw new Error('Category Already Exists!');
        };

        this.categoriesRepository.create({ name, description });
    };

};

export { CreateCategoryUseCase };