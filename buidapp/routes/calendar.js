var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  	var admin =`<li>
	       			<a href="/admin" class="waves-effect"><i class="zmdi zmdi-view-dashboard"></i> <span> Dashboard </span> </a>
	    		</li>`;
	res.render("calendar",{
		"name"  : req.user.displayName,
		"avatar": req.user.photos[0].value,
		"admin" : admin,
	})
});

module.exports = router;
