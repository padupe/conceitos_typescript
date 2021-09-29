import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvalaibleController = new ListAvailableCarController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvalaibleController.handle);

export { carsRoutes };