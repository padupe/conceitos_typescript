import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
    name: string;
    description: string;
};

class CreateCategoryService {
    constructor(private categoriesRepository: CategoriesRepository) {

    };

    execute({name, description}: IRequest): void {
        const categoryValidate = this.categoriesRepository.findByName(name);
        if (categoryValidate) {
            throw new Error('Category Already Exists!');
        };

        this.categoriesRepository.create({ name, description });
    };

};

export { CreateCategoryService };