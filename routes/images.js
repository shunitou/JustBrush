const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db/db');

// Configure multer to handle file uploads
const storage = multer.memoryStorage(); // Store the file data in memory instead of disk

const upload = multer({ storage });

// Upload image and store metadata
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { filename } = req.body;
    const size = req.file.size;
    const imageData = req.file.buffer; // Retrieve the image data from the buffer

    // Insert the image data into the 'images' table
    const query = `
      INSERT INTO images (filename, size, image_data)
      VALUES ($1, $2, $3)
      RETURNING id, upload_date, modified_date;
    `;
    const params = [filename, size, imageData];

    const result = await db.one(query, params);

    res.status(201).json({ message: 'Image uploaded successfully', image: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;