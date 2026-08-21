import { Router } from 'express';
import { cadastroUser } from '../controllers/users.controller.js';
import { validar } from '../middlewares/validar.middleware.js';
import { cadastroUserSchema } from '../schemas/users.schema.js';

const router = Router();

router.post('/', validar(cadastroUserSchema), cadastroUser);

export default router;
