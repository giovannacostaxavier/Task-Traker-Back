import { Router } from 'express';
import {
  listarTasks,
  criarTask,
  atualizarTask,
  excluirTask,
} from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', listarTasks);
router.post('/', criarTask);
router.put('/:id', atualizarTask);
router.delete('/:id', excluirTask);

export default router;
