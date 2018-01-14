var express = require('express');
var router = express.Router();
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('offers',{title : "Offers"});
});

module.exports = router;
