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

export async function editarTask(
  id: string,
  titulo: string,
  descricao: string
) {
  const resultado = await pool.query(
    'UPDATE tasks SET titulo = $1, descricao = $2 WHERE id = $3 RETURNING *',
    [titulo, descricao, id]
  );
  return resultado.rows[0];
}

export async function excluirTask(id: string) {
  const resultado = await pool.query(
    'DELETE FROM tasks WHERE id = $1 RETURNING *',
    [id]
  );
  return resultado.rows[0];
}
