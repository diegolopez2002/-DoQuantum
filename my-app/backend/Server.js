require('dotenv').config(); // Loads environment variables from .env file

const express = require('express'); // Import the Express.js framework
const cors = require('cors'); // Import the CORS middleware for handling cross-origin requests
const bodyParser = require('body-parser'); // Import the body-parser middleware for parsing request bodies
const { Pool } = require('pg'); // Import the PostgreSQL Pool for database connections
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating and verifying JWTs

const app = express(); // Create an Express.js application instance
const port = process.env.PORT || 5000; // Define the port number, defaulting to 5000 if PORT is not set in .env

const session = require('express-session'); //For managing user sessions
const passport = require('passport'); // For user authentication
require('./config/passport'); // Import Passport.js configuration

// Session middleware configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-session-secret', // Secret key for session management, get from .env
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create a session until something is stored 
  })
);

// Initialize Passport.js and use session middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: process.env.DB_USER, // Database user
  host: process.env.DB_HOST, // Database host
  database: process.env.DB_NAME, // Database name
  password: process.env.DB_PASSWORD, // Database password
  port: process.env.DB_PORT, // Database port
});

/**
 *  @route  POST /register
 *  @desc   Register a new user
 */
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body; // Extract user data from the request body

  try {
    // Check if username already exists (case-insensitive)
    const usernameCheck = await pool.query('SELECT * FROM Users WHERE LOWER(username) = LOWER($1)', [username]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ field: 'username', message: 'Username is already taken' }); // Return 400 Bad Request with specific error
    }

    // Check if email already exists (case-insensitive)
    const emailCheck = await pool.query('SELECT * FROM Users WHERE LOWER(email) = LOWER($1)', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ field: 'email', message: 'Email is already taken' }); // Return 400 Bad Request with specific error
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert the new user into the database
    await pool.query(
      'INSERT INTO Users (username, email, hashed_password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'Account created successfully' }); // Return 201 Created on successful registration
  } catch (error) {
    console.error('Error registering user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' }); // Return 500 Internal Server Error
  }
});

/**
 *  @route  POST /login
 *  @desc   Login user
 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Extract username and password from the request body

  try {
    // Check if the user exists (case-insensitive)
    const userCheck = await pool.query('SELECT * FROM Users WHERE LOWER(username) = LOWER($1)', [username]);
    if (userCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid username' }); // Return 400 Bad Request if user not found
    }

    const user = userCheck.rows[0]; // Get the user data from the query result

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' }); // Return 400 Bad Request if password doesn't match
    }

    // Generate a JWT (JSON Web Token) for authentication
    const token = jwt.sign(
      { userId: user.user_id, email: user.email }, // Payload containing user information
      process.env.JWT_SECRET || 'supersecretkey', // Secret key for signing the token, get from .env
      { expiresIn: '2h' } // Token expiration time (2 hours)
    );

    res.json({
      message: 'Login successful',
      token, // Send the token back to the client
    });
  } catch (error) {
    console.error('Error logging in:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' }); // Return 500 Internal Server Error
  }
});

//Import and use authentication routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});