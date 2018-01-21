var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');


const pathMongodb = 'mongodb://127.0.0.1:27017/admintraffic';
router.post('/', function(req, res, next) {
		try{
			mongo.connect(pathMongodb,function(err,db){
				assert.equal(null,err);
					db.collection('userlist').find({"member":false}).toArray((err, result)=> {
						res.send(result)
					});
			});
		}catch(e){
			res.redirect("/")
		}
});

module.exports = router;
