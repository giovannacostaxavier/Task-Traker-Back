import { Router } from 'express';
import { listarTasks, criarTask } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', listarTasks);
router.post('/', criarTask);

export default router;
