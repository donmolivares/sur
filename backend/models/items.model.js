import pool  from './db.js';

export const getAllItems = async () => {
  const result = await pool.query('SELECT * FROM items');
  return result.rows;
};

export const createItemModel = async (item) => {
  const { elemento, claudia, marcelo, observaciones } = item;

  const result = await pool.query(
    'INSERT INTO items (elemento, claudia, marcelo, observaciones) VALUES ($1,$2,$3,$4) RETURNING *',
    [elemento, claudia, marcelo, observaciones]
  );

  return result.rows[0];
};

export const updateItemModel = async (id, item) => {
  const { elemento, claudia, marcelo, observaciones } = item;

  await pool.query(
    'UPDATE items SET elemento=$1, claudia=$2, marcelo=$3, observaciones=$4 WHERE id=$5',
    [elemento, claudia, marcelo, observaciones, id]
  );
};

export const deleteItemModel = async (id) => {
  await pool.query('DELETE FROM items WHERE id=$1', [id]);
};