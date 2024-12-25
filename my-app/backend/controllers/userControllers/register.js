/**
 *  @route  POST /register
 *  @desc   Register a new user
 */
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username exists
    const usernameCheck = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ field: 'username', message: 'Username is already taken' });
    }

    // Check if email exists
    const emailCheck = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
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