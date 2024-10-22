import { Sequelize } from 'sequelize';

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3001;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
});


//to connect to the database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        //to test connection
        console.log('you are connected to your cookbook');
    } catch (error) {
        console.error('Sorry could not connect to your cookbook:', error);
        process.exit(1);
    }
};

export default { sequelize, connectDB };
