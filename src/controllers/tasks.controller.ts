import type { Request, Response } from 'express';
import * as tasksService from '../services/tasks.service.js';

export async function listarTasks(req: Request, res: Response) {
  try {
    const tasks = await tasksService.buscarTodas();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar tasks' });
  }
}
export async function buscarTask(req: Request, res: Response) {
  try {
    const id = String(req.params.id);

    const task = await tasksService.buscarPorId(id);

    if (!task) {
      return res.status(404).json({ erro: 'Task não encontrada' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar task' });
  }
}
export async function criarTask(req: Request, res: Response) {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo) {
      return res.status(400).json({ erro: 'O campo título é obrigatório' });
    }
    const novaTask = await tasksService.criarTask(titulo, descricao);
    res.status(201).json(novaTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar task' });
  }
}
export async function atualizarTask(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const { titulo, descricao } = req.body;

    if (!titulo) {
      return res.status(400).json({ erro: 'O campo título é obrigatório' });
    }
    const taskAtualizada = await tasksService.editarTask(id, titulo, descricao);
    if (!taskAtualizada) {
      return res.status(404).json({ erro: 'Task não encontrada' });
    }
    res.status(200).json(taskAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Eroo ao atualizar task' });
  }
}
export async function excluirTask(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const taskExcluida = await tasksService.excluirTask(id);
    if (!taskExcluida) {
      return res.status(404).json({ erro: 'Task não encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao excluir task' });
  }
}
