import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const cadastroUser = async (
  nome: string,
  email: string,
  senha: string
) => {
  const senhaHash = await bcrypt.hash(senha, 10);
  const resultado = await pool.query(
    'INSERT INTO users (nome,email,senha) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, senhaHash]
  );
  return resultado.rows[0];
};
