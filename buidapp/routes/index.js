var express = require('express');
var router = express.Router();
var passport = require("passport");
const mongo = require('mongodb');
const assert = require('assert');


const pathMongodb = 'mongodb://127.0.0.1:27017/admintraffic';

/* GET home page. */
router.get('/', function(req, res, next) {
	passport.authenticate('facebook')(req, res, function () {
		try{
				var query = {
					"idFacebook": req.user.id
 				}
 				var dataInsert = {
 					"idFacebook": req.user.id,
 					"profile" : req.user,
					"admin"  : false,
					"master" : false,
					"member" : false
 				}
			mongo.connect(pathMongodb,function(err,db){
				assert.equal(null,err);
					db.collection('userlist').findOne(query,function(err,result){
						if(result){
							if(result.member){
								var admin = "";
								if(result.admin||result.master){
									admin =`<li>
		                               			<a href="/admin" class="waves-effect"><i class="zmdi zmdi-view-dashboard"></i> <span> Dashboard </span> </a>
		                            		</li>`;
								}
								res.render("index",{
									"name"  : req.user.displayName,
									"avatar": req.user.photos[0].value,
									"admin" : admin
								})
							}else{
								res.render("error",{
									error:{
										status: 404,
										stack : "Please wait for approval from the administrator!!!"
									}, message: "Not Found"
								})
							}
							assert.equal(null,err);
							db.close();
						}else{
							db.collection('userlist').insertOne(dataInsert,(err,result)=>{
							})
							res.render("error",{
								error:{
									status: 404,
									stack : "Please wait for approval from the administrator!!!"
								}, message: "Not Found"
							})
						};
						assert.equal(null,err);
						db.close();
					});
			});
		}catch(e){
			res.redirect("/")
		}
    });
});

module.exports = router;
