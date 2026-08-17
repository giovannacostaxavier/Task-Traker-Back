import pool from '../config/db.js';

export async function buscarTodas() {
  const resultado = await pool.query('SELECT * FROM tasks');
  return resultado.rows;
}

export async function criarTask(titulo: string, descricao: string) {
  const resultado = await pool.query(
    'INSERT INTO tasks (titulo, descricao) VALUES ($1, $2) RETURNING *',
    [titulo, descricao]
  );
  return resultado.rows[0];
}
