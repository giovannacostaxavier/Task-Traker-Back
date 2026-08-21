import { z } from 'zod';

export const criarTaskSchema = z.object({
  titulo: z.string().min(1, 'O campo título é obrigatório'),
  descricao: z.string().optional(),
});

export const atualizarTaskSchema = z.object({
  titulo: z.string().min(1, 'O campo título é obrigatório'),
  descricao: z.string().optional(),
});

export const atualizarStatusSchema = z.object({
  status: z.enum(['todo', 'doing', 'done'], {
    message: 'Status inválido. Use: todo, doing ou done',
  }),
});
