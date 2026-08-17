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
