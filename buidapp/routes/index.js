var express = require('express');
var router = express.Router();
var passport = require("passport");
const mongo = require('mongodb');
const assert = require('assert');


const url = 'mongodb://127.0.0.1:27017/admintraffic';

/* GET home page. */
router.get('/', function(req, res, next) {
	passport.authenticate('facebook',{scope:"email"})(req, res, function () {
		console.log('Cookies', req.cookies)
		console.log('====================================')
		console.log('Signed Cookies', req.session)
		try{
				var query = {
					"idFacebook" : req.user.id
				}
			// console.log(query);
			mongo.connect(url,function(err,db){
				assert.equal(null,err);
					db.collection('userlist').findOne(query,function(err,result){
						console.log(result, query)
						if(result){
							var admin =`<li>
	                               			<a href="/admin" class="waves-effect"><i class="zmdi zmdi-view-dashboard"></i> <span> Dashboard </span> </a>
	                            		</li>`;
							res.render("index",{
								"name"  : req.user.displayName,
								"avatar": req.user.photos[0].value,
								"admin" : admin
							})
							assert.equal(null,err);
							db.close();
						}else{
							res.render("error",{
								error:{
									status: 404,
									stack : ""
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
