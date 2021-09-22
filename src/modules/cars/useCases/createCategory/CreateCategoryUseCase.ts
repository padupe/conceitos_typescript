import { AppError } from "@errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
    name: string;
    description: string;
};

@injectable()
class CreateCategoryUseCase {
    constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) {

    };

    async execute({name, description}: IRequest): Promise<void> {
        const categoryValidate = await this.categoriesRepository.findByName(name);
        if (categoryValidate) {
            throw new AppError('Category Already Exists!');
        };

        this.categoriesRepository.create({ name, description });
    };

};

export { CreateCategoryUseCase };