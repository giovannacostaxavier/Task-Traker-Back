import { Router } from 'express';
import { cadastroUser } from '../controllers/users.controller.js';

const router = Router();

router.post('/', cadastroUser);

export default router;
