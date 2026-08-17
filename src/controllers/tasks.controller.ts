import type { Request, Response } from 'express';
import * as tasksService from '../services/tasks.service.js';

export async function listarTarefas(req: Request, res: Response) {
  try {
    const tasks = await tasksService.buscarTodas();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar tasks' });
  }
}
