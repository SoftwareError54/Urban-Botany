import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

// const config = {
//     db: {
//     host: process.env.MYSQL_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.MYSQL_ROOT_USER,
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 2,
//     queueLimit: 0,
//   },
// };
const config = process.env.MYSQL_URL || process.env.DATABASE_URL || {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
};

const pool = mysql.createPool(config);

export async function query (sql, params){
    const [rows, fields] = await pool.execute(sql, params);
    return {rows, fields};
}

export default {pool};