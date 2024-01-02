// Importing Sequalize
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Using JAWSDB to create the database via cloud
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
// If running locally, create a local database
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

// Export modules
module.exports = sequelize;