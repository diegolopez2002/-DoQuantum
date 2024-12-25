require('dotenv').config();  // Loads variables from .env

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000; // Backend will run on localhost:5000

const session = require('express-session');
const passport = require('passport');
require('./config/passport');

app.use(
  session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

/**
 *  @route  POST /register
 *  @desc   Register a new user
 */
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username exists
    const usernameCheck = await pool.query('SELECT * FROM Users WHERE LOWER(username) = LOWER($1)', [username]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ field: 'username', message: 'Username is already taken' });
    }

    // Check if email exists
    const emailCheck = await pool.query('SELECT * FROM Users WHERE LOWER(email) = LOWER($1)', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ field: 'email', message: 'Email is already taken' });
    }

    // Hash the password and insert the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO Users (username, email, hashed_password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 *  @route  POST /login
 *  @desc   Login user
 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  console.log(req.body)
  try {
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM Users WHERE LOWER(username) = LOWER($1)', [username]);
    if (userCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    const user = userCheck.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_SECRET || 'supersecretkey',
      { expiresIn: '2h' }
    );

    res.json({ 
      message: 'Login successful',
      token 
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
