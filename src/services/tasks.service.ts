import pool from '../config/db.js';

export const buscarTodas = async () => {
  const resultado = await pool.query('SELECT * FROM tasks');
  return resultado.rows;
};
export const buscarPorId = async (id: string) => {
  const resultado = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return resultado.rows[0];
};
export const criarTask = async (
  titulo: string,
  descricao: string,
  userId: number
) => {
  const resultado = await pool.query(
    'INSERT INTO tasks (titulo, descricao, user_id) VALUES ($1, $2, $3) RETURNING *',
    [titulo, descricao, userId]
  );
  return resultado.rows[0];
};

export const editarTask = async (
  id: string,
  titulo: string,
  descricao: string
) => {
  const resultado = await pool.query(
    'UPDATE tasks SET titulo = $1, descricao = $2 WHERE id = $3 RETURNING *',
    [titulo, descricao, id]
  );
  return resultado.rows[0];
};

export const excluirTask = async (id: string) => {
  const resultado = await pool.query(
    'DELETE FROM tasks WHERE id = $1 RETURNING *',
    [id]
  );
  return resultado.rows[0];
};
