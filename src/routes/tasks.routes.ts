import { Router } from 'express';
import {
  listarTasks,
  buscarTask,
  criarTask,
  atualizarTask,
  excluirTask,
} from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', listarTasks);
router.get('/:id', buscarTask);
router.post('/', criarTask);
router.put('/:id', atualizarTask);
router.delete('/:id', excluirTask);

export default router;
