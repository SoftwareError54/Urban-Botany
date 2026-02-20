import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const config = {
    db: {
    host: process.env.MYSQL_HOST || process.env.DB_HOST || 'mysql',
    port: process.env.MYSQL_PORT || process.env.DB_PORT || 3306,
    user: process.env.MYSQL_ROOT_USER || process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || 'urbanbotany',
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
};

const pool = mysql.createPool(config.db);

export async function query (sql, params){
    const [rows, fields] = await pool.execute(sql, params);
    return {rows, fields};
}

export default {pool};