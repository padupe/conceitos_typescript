import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './user.routes';
import { carsRoutes } from './cars.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoutes);
router.use(authRoutes);

export { router };