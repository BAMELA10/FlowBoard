import express, { type Router } from 'express';
import { validatePayload } from '../middleware/validate-payload';
import { payloadLoginSchema, payloadRegisterSchema } from '../dto';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repository';
import { asyncHandler } from '../utils.ts';

const router: Router = express.Router();
const authController = new AuthController(new AuthService(new UserRepository()));

router.post(
  '/register',
  [validatePayload(payloadRegisterSchema, 'body')],
  asyncHandler(authController.register),
);

router.post(
  '/login',
  [validatePayload(payloadLoginSchema, 'body')],
  asyncHandler(authController.login),
);

router.get(
  "/refresh",
  asyncHandler(authController.refresh),
);

router.post(
  "/logout",
  asyncHandler(authController.logout),
);

export default router;
