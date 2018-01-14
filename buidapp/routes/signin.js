var express = require('express');
var router = express.Router();
var passport = require("passport")
// var firebase = require('firebase');

/* GET users listing. */
router.get('/', passport.authenticate('facebook'));
router.get('/signin/return', 
  passport.authenticate('facebook', { failureRedirect: '/signin' }),
  function(req, res) {
    res.redirect('/admin');
  });

module.exports = router;
