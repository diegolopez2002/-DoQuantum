/**
 *  @route  POST /login
 *  @desc   Login user
 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  console.log(req.body)
  try {
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);
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