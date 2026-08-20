import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const autenticarToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }
  const token = String(authHeader.split(' ')[1]);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = payload;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};
