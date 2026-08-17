import { Router } from 'express';
import {
  listarTasks,
  criarTask,
  atualizarTask,
} from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', listarTasks);
router.post('/', criarTask);
router.put('/:id', atualizarTask);

export default router;
