require('dotenv').config();  // Loads variables from .env

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000; // Backend will run on localhost:5000

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

const userController = require('./controllers/userControllers');

app.post('/register', userController.register);
app.post('/login', userController.login);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
