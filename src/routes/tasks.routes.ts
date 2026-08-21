import { Router } from 'express';
import { autenticarToken } from '../middlewares/auth.middleware.js';
import { validar } from '../middlewares/validar.middleware.js';
import {
  criarTaskSchema,
  atualizarTaskSchema,
  atualizarStatusSchema,
} from '../schemas/tasks.schema.js';
import {
  listarTasks,
  buscarTask,
  criarTask,
  atualizarTask,
  excluirTask,
  atualizarStatus,
} from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', autenticarToken, listarTasks);
router.get('/:id', autenticarToken, buscarTask);
router.post('/', autenticarToken, validar(criarTaskSchema), criarTask);
router.put(
  '/:id',
  autenticarToken,
  validar(atualizarTaskSchema),
  atualizarTask
);
router.delete('/:id', autenticarToken, excluirTask);
router.patch(
  '/:id/status',
  autenticarToken,
  validar(atualizarStatusSchema),
  atualizarStatus
);

export default router;
