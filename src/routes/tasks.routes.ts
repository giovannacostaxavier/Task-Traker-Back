import { Router } from 'express';
import { listarTasks } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', listarTasks);

export default router;
