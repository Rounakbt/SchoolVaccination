const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      // Simulate token (in real app, you'd use JWT)
      res.json({ message: '✅ Login successful', user: result.rows[0], token: 'dummy-token-123' });
    } else {
      res.status(401).json({ message: '❌ Invalid credentials' });
    }
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
