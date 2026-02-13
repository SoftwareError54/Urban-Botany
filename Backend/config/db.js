import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const config = {
    db: {
    host: process.env.MYSQL_HOST,
    port: process.env.DB_PORT,
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
};

const pool = mysql.createPool(config.db);

export async function query (sql, params){
    const [rows] = await pool.execute(sql, params);
    return rows;
}

export default {pool,query};