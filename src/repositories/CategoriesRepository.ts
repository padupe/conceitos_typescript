import { Category } from '../model/Category'

interface ICreateCategoryDTO {
    name: string;
    description: string;
};

class CategoriesRepository {
    private categories: Category[]= [];

    constructor() {
        this.categories = [];
    };

    create({ name, description }: ICreateCategoryDTO) {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });
            
        this.categories.push(category);
    };

    list(): Category[] {
        return this.categories;
    };

    findByName(name: string): Category {
        const findCategory = this.categories.find((category) => category.name === name);
        return findCategory;
    };
};

export { CategoriesRepository };