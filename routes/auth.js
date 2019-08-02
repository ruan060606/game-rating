const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
    // Successful authentication, redirect home.
      res.redirect('/');
    });
};
