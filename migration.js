// migration.js
import { connectDB, sequelize } from './server/config/db.js'; // Import sequelize along with connectDB
import { Umzug, SequelizeStorage } from 'umzug';

const umzug = new Umzug({
  migrations: {
    glob: 'server/config/migrations/*.js', // Path to your migration files
    resolve: ({ name, path }) => import(path), // Dynamically import migration modules
  },
  storage: new SequelizeStorage({ sequelize }), // Use Sequelize as the storage engine
  context: sequelize.getQueryInterface(), // Get the query interface to execute migrations
  logger: console, // Set logger to console for migration logs
});

(async () => {
  try {
    // Establish database connection
    await connectDB();
    console.log('Database connected successfully.');

    // Run the migrations
    await umzug.up();
    console.log('Migrations run successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    // Close the database connection if needed
    await sequelize.close(); // Ensure to close the connection after migrations
  }
})();


