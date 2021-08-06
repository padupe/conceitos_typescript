
interface IRequest {
    name: string;
    description: string;
};

class CreateCategoryService {
    execute({name, description}: IRequest) {
        const categoryValidate = categoriesRepository.findByName(name);
        if (categoryValidate) {
            throw new Error('Category Already Exists!');
        };

        categoriesRepository.create({ name, description });
    };

};

export { CreateCategoryService };