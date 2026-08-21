import type { Request, Response, NextFunction } from 'express';
import * as tasksService from '../services/tasks.service.js';

export const listarTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await tasksService.buscarTodas();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
export const buscarTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = String(req.params.id);

    const task = await tasksService.buscarPorId(id);

    if (!task) {
      return res.status(404).json({ erro: 'Task não encontrada' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
export const criarTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { titulo, descricao } = req.body;

    const usuario = req.user as { id: number };
    const novaTask = await tasksService.criarTask(
      titulo,
      descricao,
      usuario.id
    );
    res.status(201).json(novaTask);
  } catch (error) {
    next(error);
  }
};
export const atualizarTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = String(req.params.id);
    const { titulo, descricao } = req.body;

    const taskAtualizada = await tasksService.editarTask(id, titulo, descricao);
    if (!taskAtualizada) {
      return res.status(404).json({ erro: 'Task não encontrada' });
    }
    res.status(200).json(taskAtualizada);
  } catch (error) {
    next(error);
  }
};
export const excluirTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = String(req.params.id);
    const taskExcluida = await tasksService.excluirTask(id);
    if (!taskExcluida) {
      return res.status(404).json({ erro: 'Task não encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
export const atualizarStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    const novoStatus = await tasksService.atualizarStatus(status, id);
    if (!novoStatus) {
      return res.status(404).json({ erro: 'Novo status não encontrado' });
    }
    res.status(200).json(novoStatus);
  } catch (error) {
    next(error);
  }
};
