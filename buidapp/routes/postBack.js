var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');

const pathMongodb = 'mongodb://127.0.0.1:27017/admintraffic';
router.get('/:parameter', function(req, res, next) {
	if(req.params.parameter==="eventdata"&&req.query.transaction_id!==undefined){
		res.send(JSON.stringify(req.query))
	}else{
		res.end();
	}
});

module.exports = router;
