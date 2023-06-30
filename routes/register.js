const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/register', (req, res) => {
    res.render('register.ejs');
  });
  
// Handle user registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, walletAddress } = req.body;

    // Check if the username already exists
    const existingUser = await db.oneOrNone('SELECT * FROM users2 WHERE username = $1', [username]);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Insert the user into the database
    const query = 'INSERT INTO users2 (username, password, wallet_address) VALUES ($1, $2, $3) RETURNING id';
    const result = await db.one(query, [username, password, walletAddress]);

    res.status(201).json({ message: 'User registered successfully', userId: result.id });
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;