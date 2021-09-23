import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {

    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const findCategory = this.categories.find((category) => category.name === name);
        return findCategory;
    };

    async list(): Promise<Category[]> {
        const showAll = this.categories;
        return showAll;
    };

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const createCategory = new Category();

        Object.assign(createCategory, {
            name,
            description,
        });

        this.categories.push(createCategory);
    }

};

export { CategoriesRepositoryInMemory };