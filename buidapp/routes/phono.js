var express = require('express');
var router = express.Router();
var request = require("request");

/* GET home page. */
router.post('/', function(req, res, next) {
	var dataprocessing = new DataProcessing();
	function DataProcessing(){
		
	}
	function callback(body) {
		var resClient = JSON.parse(body).data.rowset;
		res.send(resClient);
	}
	var r = request.get("http://phono.api.offerslook.com/aff/v1/batches/offers",function(err,res,body){
		callback(body);
	}).auth("Gm@thdmediaglobal.com","1caabd0251d1494ba2ac07fcf921a426",false);
});

module.exports = router;
