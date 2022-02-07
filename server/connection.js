import mysql from 'mysql2/promise';
import dotenv from 'dotenv'; 
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Database is connected!');
  connection.release(); // what does it mean
})

export default pool;