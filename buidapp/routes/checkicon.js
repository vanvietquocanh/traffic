var express = require('express');
var router = express.Router();
var gplay = require("google-play-scraper");
var store = require("app-store-scraper");

/* GET home page. */
router.post('/', function(req, res, next) {
	if(isNaN(req.body.id)){
		gplay.app({
			appId 	: req.body.id,
		}).then(function(result) {
			let data = {
				icon : result.icon,
				name : result.title,
			}
			res.send(data);
		}).catch((error)=>{
			let err = {
				er : error,
				id : req.body.id
			}
			res.send(err);
		});
	}else{
		store.app({
			id     : req.body.id,
		}).then(function(result){
			let data = {
				icon : result.icon,
				name : result.title,
			}
			res.send(data);
		}).catch(function(error) {
			let err = {
				er : error,
				id : req.body.id
			}
			res.send(err);
		});
	}
});

module.exports = router;
