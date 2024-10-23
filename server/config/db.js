const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a new pool instance to manage connections
const pool = new Pool({
  user: process.env.DB_USER,      // e.g., 'postgres'
  host: process.env.DB_HOST,      // e.g., 'localhost'
  database: process.env.DB_NAME,  // e.g., 'recipe_db'
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,  // Default PostgreSQL port
});

// Connect to the database and log a successful connection or error
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

// Export the pool instance for use in other parts of your app
module.exports = pool;