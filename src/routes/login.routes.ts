import { Router } from 'express';
import { loginUser } from '../controllers/users.controller.js';

const router = Router();

router.post('/', loginUser);

export default router;
