import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    
    
    return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
    const showAll = categoriesRepository.list();

    return response.status(200).json(showAll)
});

export { categoriesRoutes };