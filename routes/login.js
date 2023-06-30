// Server code
const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Handle login request
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Query the database to validate the user
  const query = `
    SELECT * FROM users
    WHERE username = $1 AND password = $2
  `;
  const params = [username, password];

  try {
    const user = await db.oneOrNone(query, params);

    if (user) {
      // User exists and credentials are valid
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Failed to query user:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;