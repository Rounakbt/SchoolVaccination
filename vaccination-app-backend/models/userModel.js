const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username';
  const values = [username, hashedPassword];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const authenticateUser = async (username, password) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const result = await pool.query(query, values);
  const user = result.rows[0];
  if (user && await bcrypt.compare(password, user.password_hash)) {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
  return null;
};

module.exports = { registerUser, authenticateUser };
