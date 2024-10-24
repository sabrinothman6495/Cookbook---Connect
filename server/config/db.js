import { Sequelize } from 'sequelize';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pkg;

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;

console.log('DB_NAME:', DB_NAME);
console.log('DB_USER:', DB_USER);
console.log('DB_PASSWORD:', DB_PASSWORD);
console.log('DB_HOST:', DB_HOST);
console.log('DB_PORT:', DB_PORT);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
});

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database with Sequelize');
  } catch (error) {
    console.error('Database connection error with Sequelize:', error);
    process.exit(1);
  }

  pool.connect((err) => {
    if (err) {
      console.error('PG Pool connection error', err.stack);
    } else {
      console.log('Database connected successfully with PG Pool');
    }
  });
};

export { sequelize, pool, connectDB };










