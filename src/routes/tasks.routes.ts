import { Router } from 'express';
import { autenticarToken } from '../middlewares/auth.middleware.js';
import {
  listarTasks,
  buscarTask,
  criarTask,
  atualizarTask,
  excluirTask,
} from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', autenticarToken, listarTasks);
router.get('/:id', autenticarToken, buscarTask);
router.post('/', autenticarToken, criarTask);
router.put('/:id', autenticarToken, atualizarTask);
router.delete('/:id', autenticarToken, excluirTask);

export default router;
