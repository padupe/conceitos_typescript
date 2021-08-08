import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryUseCase } from '../modules/cars/useCases/createCategory/CreateCategoryUseCase';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.post('/', (request, response) => {

});

categoriesRoutes.get('/', (request, response) => {
    const showAll = categoriesRepository.list();

    return response.status(200).json(showAll)
});

export { categoriesRoutes };