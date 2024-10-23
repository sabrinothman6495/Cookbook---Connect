import { Sequelize } from 'sequelize';

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432; // Typically PostgreSQL default port is 5432

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT, // Include port in the config
  dialect: 'postgres', // Ensure the correct dialect is specified
});

const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Test connection
    console.log('You are connected to your cookbook database');
  } catch (error) {
    console.error('Sorry, could not connect to your cookbook database:', error);
    process.exit(1); // Exit on failure
  }
};

export { sequelize, connectDB };
