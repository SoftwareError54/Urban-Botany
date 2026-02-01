import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,  // e.g., 'localhost' or 'db' in Docker
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'urban_botany',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;