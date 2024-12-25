const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://do-quantum-web-app.vercel.app/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
          // Handle user data here (e.g., save to database)
          return done(null, profile);
        } catch (error) {
          return done(error, null);
        }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
