import { Router } from 'express';
import { loginUser } from '../controllers/users.controller.js';
import { validar } from '../middlewares/validar.middleware.js';
import { loginUserSchema } from '../schemas/users.schema.js';

const router = Router();

router.post('/', validar(loginUserSchema), loginUser);

export default router;
