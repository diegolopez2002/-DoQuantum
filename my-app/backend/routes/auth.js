const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google to redirect to
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/dashboard'); // Redirect to your frontend dashboard
  }
);

module.exports = router;
