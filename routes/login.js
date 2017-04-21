var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../common/model');
var crypto = require('crypto');


router.get('/',function(req,res,next){
	if(req.session.user){
		res.redirect('/hoster');
	}else{
		res.render('login');
	}
});

router.post('/',function(req,res,next){
	//把用户名进行md5加密验证
	var md5 = crypto.createHash('md5');
	var userId = md5.update(req.body.userId).digest('base64');
	var Md5 = crypto.createHash('md5');
	var password = Md5.update(req.body.userPassword).digest('base64');
	//把用户名密码进行对比验证
	var user = model.user;
	user.findOne({name:userId},function(error,doc){
		console.log(doc);
		if(doc === null){
			res.status(404).send('未找到用户');
		}else if(password !== doc.password){
			res.status(404).send('密码错误');
		}else{
			//res.status(200).send('登录成功');
			req.session.user = doc;
			res.status(200).send('登录成功');
		}
	});
})

module.exports = router;