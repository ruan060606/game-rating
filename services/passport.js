const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { facebookClientID, facebookSecret } = require('../config/keys');
const User = require('../models/users');

passport.use(new FacebookStrategy({
  clientID: facebookClientID,
  clientSecret: facebookSecret,
  callbackURL: '/auth/facebook/callback',
}, async (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile);
  const existingUser = await User.findOne({ userId: profile.id });
  if (!existingUser) {
    // if user doesnt exist
    const newUser = await new User({
      userId: profile.id,
      password: 'facebookPassword',
      platform: 'facebook',
    }).save();
    return cb(null, newUser);
  }
  return cb(null, existingUser);
}));
