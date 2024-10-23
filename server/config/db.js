import { Sequelize } from 'sequelize';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Sequelize configuration
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432; // Default PostgreSQL port

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres', // Ensure using PostgreSQL
});

// PG Pool configuration for direct queries if needed
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Function to connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('You are connected to your cookbook database with Sequelize');
  } catch (error) {
    console.error('Could not connect to your cookbook database with Sequelize:', error);
    process.exit(1);
  }

  // Test connection with Pool
  pool.connect((err) => {
    if (err) {
      console.error('Error acquiring client from pool', err.stack);
    } else {
      console.log('Database connected successfully with PG Pool');
    }
  });
};

export { sequelize, pool, connectDB }

