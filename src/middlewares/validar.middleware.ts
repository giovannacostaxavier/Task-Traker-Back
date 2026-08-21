import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export const validar = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      const erros = resultado.error.issues.map((erro) => erro.message);
      return res.status(400).json({ erro: erros.join(', ') });
    }

    req.body = resultado.data;
    next();
  };
};
