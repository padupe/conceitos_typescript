import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';

const carsRoutes = Router();

const uploadImageCar = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvalaibleController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvalaibleController.handle);
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, uploadImageCar.array('images') , uploadCarImageController.handle);

export { carsRoutes };