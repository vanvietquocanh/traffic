var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');


const pathMongodb = 'mongodb://127.0.0.1:27017/admintraffic';
/* GET home page. */
router.post('/', function(req, res, next) {
	try {
		var query = {
			"isReportClick": true
		}
		mongo.connect(pathMongodb,function(err,db){
			assert.equal(null,err);
				db.collection('userlist').findOne(query, (err,result)=>{
					var dataResponse = result.report.filter(function(val) {
						if(req.user.id == 904759233011090){
							return val;
						}else{
							return val.idFacebook === req.user.id;
						}
					});
					res.send(dataResponse)
					console.log(dataResponse)
				assert.equal(null,err);
				db.close();
			});
		});
	} catch(e) {
		console.log(e);
	}
});

module.exports = router;
