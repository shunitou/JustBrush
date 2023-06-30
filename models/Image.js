const { db } = require('../db/db');
const fs = require('fs');

// Define the 'Image' table
const createImageTable = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        size INT,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        image_data BYTEA
      )
    `);
    console.log('Image table created successfully');
  } catch (error) {
    console.error('Failed to create Image table:', error);
    throw error;
  }
};

// Function to insert an image into the 'images' table
const insertImage = async (filename, imageData) => {
  try {
    await db.none(`
      INSERT INTO images (filename, size, image_data)
      VALUES ($1, $2, $3)
    `, [filename, imageData.length, imageData]);
    console.log('Image inserted successfully');
  } catch (error) {
    console.error('Failed to insert image:', error);
    throw error;
  }
};

module.exports = { createImageTable, insertImage };