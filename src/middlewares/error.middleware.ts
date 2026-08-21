import type { Request, Response, NextFunction } from 'express';

export const tratarErro = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
};
