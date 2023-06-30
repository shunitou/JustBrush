const pgp = require('pg-promise')();
require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : null,
};

const db = pgp(config);

db.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

module.exports = db;