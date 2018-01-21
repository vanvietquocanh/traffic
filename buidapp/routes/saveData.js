var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');


const pathMongodb = 'mongodb://127.0.0.1:27017/admintraffic';
router.post('/', function(req, res, next) {
	var data = {
		$set:{"member":req.body.member}
	}
	var query = {
		"idFacebook" : req.body.idFacebook
	}
	try{
		mongo.connect(url,function(err,db){
			assert.equal(null,err);
				db.collection('userlist').updateOne(query, data, {upsert:true}, function(err,result){
					res.send(JSON.stringify({"res":"ok"}))
					assert.equal(null,err);
					db.close();
				});
		});
	}catch(e){
		res.send(JSON.stringify({"res":"err"}))
	}
});

module.exports = router;
