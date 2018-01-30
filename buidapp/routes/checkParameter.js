var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');
var randomstring = require("randomstring");


const pathMongodb = 'mongodb://127.0.0.1:27017/admintraffic';
/* GET home page. */
router.get('/', function(req, res, next) {
	function saveDB(result){
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		try{
			var query = {
				"isReportClick" : true
			}
			var today = new Date();
			var strToday = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} - ${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
			var keySub = randomstring.generate();
			var data = {
				$push : {
					"report":{
						"name"	 	: result.displayName,
						"idFacebook": result.idFacebook,
						"idOffer"   : req.query.offer_id,
						"id"        : req.query.aff_id,
						"time"      : strToday,
						"ip"	    : ip,
						"agent"     : req.rawHeaders,
						"key"       : keySub
					}
				}							
			}
			console.log(req.query)
			var queryCheckLink = {
				"dataAPITrackinglink" : true,
			}
			mongo.connect(pathMongodb,(err,db)=>{
				assert.equal(null,err);
					db.collection('userlist').findOne(queryCheckLink,function(err,result){
						result.data.offers.forEach((item,index)=>{
							if(index==req.query.offer_id){
								redirectLink(item.offer_url);
							}
						})
					assert.equal(null,err);
					db.close();
				});
			})
			function redirectLink(link) {
				mongo.connect(pathMongodb,function(err,db){
					assert.equal(null,err);
						db.collection('userlist').updateOne(query,data, {upsert: true},function(err,result){
							var linkRedirect = link+"&aff_sub="+keySub;
							console.log(linkRedirect)
							res.redirect(linkRedirect)
						assert.equal(null,err);
						db.close();
					});
				});
			}
		}catch(e){
			res.redirect("/")
			res.end();
		}	
	}
	try {
		var query = {
			"idFacebook" : req.query.aff_id
		}
		mongo.connect(pathMongodb,function(err,db){
			assert.equal(null,err);
				db.collection('userlist').findOne(query, function(err,result){
					if(result.profile.displayName){
						saveDB(result.profile)
					}
				assert.equal(null,err);
				db.close();
			});
		});
	} catch(e) {
		res.redirect("/");
		res.end();
	}
});

module.exports = router;
