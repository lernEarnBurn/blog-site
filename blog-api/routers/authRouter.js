const express = require('express')
const passport = require('passport')
const router = express.Router()

router.post('/log-in',  passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
}), (req, res) => { res.json('logged in') })

router.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json('logged out');
  });
});


module.exports = router