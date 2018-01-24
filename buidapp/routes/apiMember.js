var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');


const pathMongodb = 'mongodb://127.0.0.1:27017/admintraffic';
router.post('/', function(req, res, next) {
	var query = {
		"member": false,
		"admin" : false,
		"master": "true"
	}
		try{
			mongo.connect(pathMongodb,function(err,db){
				assert.equal(null,err);
					db.collection('userlist').find(query).toArray((err, result)=> {
						res.send(result)
					});
			});
		}catch(e){
			res.redirect("/")
		}
});

module.exports = router;
