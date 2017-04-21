var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../common/model');


router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/getData',function(req,res,next){
	var edi;
	(req.query.edi === 'null')?edi = global.stuffEdi:edi = req.query.edi;
	var showStuff = model.showStuff;
	showStuff.find({stuffEdi:edi},function(error,doc){
		var title = model.title;
		title.find({titleEdi:edi},function(error,Doc){
				var stuffData = {
				edi:global.stuffEdi,
				data:doc,
				voted:req.session.voted,
				title:Doc
			};
			res.send(JSON.stringify(stuffData));
		});
	});
})


router.get('/upData',function(req,res,next){
	var Name = req.query.name;
	var Vote = req.query.votes;
	console.log(Vote);
	var showStuff = model.showStuff;
	showStuff.update({name:Name},{$set:{name:Name,votes:Vote}},function(error,reslut){
		if(error){
			console.log(error);
		}else{
			console.log(reslut);
		}
	})
	req.session.voted = true;
	res.sendStatus(200);
})

module.exports = router;
