import pool from '../config/db.js';

export async function buscarTodas() {
  const resultado = await pool.query('SELECT * FROM tasks');
  return resultado.rows;
}
