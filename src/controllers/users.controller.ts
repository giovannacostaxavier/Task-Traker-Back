import type { Request, Response } from 'express';
import * as usersService from '../services/users.service.js';

export const cadastroUser = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ erro: 'Nome, email e senha são obrigatórios' });
    }
    const novoUser = await usersService.cadastroUser(nome, email, senha);
    res.status(201).json(novoUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};
