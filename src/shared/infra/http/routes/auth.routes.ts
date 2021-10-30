import { Router } from 'express';
import { AuthUserController } from '@modules/accounts/useCases/auth/AuthUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const authRoutes = Router();
const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/sessions", authUserController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);


export { authRoutes };