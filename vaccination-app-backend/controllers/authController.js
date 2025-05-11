const { registerUser, authenticateUser } = require('../models/userModel');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await registerUser(username, password);
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authenticateUser(username, password);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { register, login };
