// Server code
const { db } = require('../db/db');

// Define the 'users' table
const createUserTable = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        wallet_address VARCHAR(255) NOT NULL
      )
    `);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Failed to create Users table:', error);
    throw error;
  }
};

module.exports = { createUserTable };