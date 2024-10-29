import { Sequelize } from 'sequelize';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pkg;
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST = 'localhost',
  DB_PORT = 5432
} = process.env;

const sequelizeConfig = {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, sequelizeConfig);

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Sequelize connection established');
    
    await new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) {
          reject(err);
          return;
        }
        release();
        resolve();
      });
    });
    console.log('✓ PG Pool connection established');
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    process.exit(1);
  }
};

export { sequelize, pool, connectDB };