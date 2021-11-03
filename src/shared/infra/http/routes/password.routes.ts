import { Router } from 'express';


const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotMailController();


export { passwordRoutes };