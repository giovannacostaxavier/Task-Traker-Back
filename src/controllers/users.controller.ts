import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as usersService from '../services/users.service.js';

export const cadastroUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nome, email, senha } = req.body;

    const novoUser = await usersService.cadastroUser(nome, email, senha);
    res.status(201).json(novoUser);
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, senha } = req.body;

    const usuario = await usersService.buscarUsuario(email);

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
