var express = require('express');
var router = express.Router();
var passport = require("passport")

/* GET home page. */
router.get('/', function(req, res, next) {
	passport.authenticate('facebook')(req, res, function (err, user, info) {
		console.log(err, user, info)
        res.render('index');
    });
});

module.exports = router;
