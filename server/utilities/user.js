import db from '../connection.js';

// id: int, password?:bool, returns dict 
export const getUserById = async (id, password) => {
  const getUser = `SELECT id, name, avatar, tag, statusId, email, color${password ? ', password' : ''} FROM users WHERE id = ${id} LIMIT 1`;
  const [userRow] = await db.query(getUser);
  return userRow[0];
}