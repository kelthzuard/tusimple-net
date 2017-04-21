var express = require('express');
var formidable = require('formidable');
var router = express.Router();
var util = require('util');
var fs = require('fs');
var model = require('../common/model')



router.get('/',function(req,res,next){
	res.render('addStuff');
})

router.post('/',function(req,res,next){



	//设置上传参数
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = './public/images/';
	form.keepExtensions = true;
	form.maxFieldsSize = 2*1024*1024;
	console.log('about to parse');



	//完成上传图片至img文件夹
	form.parse(req,function(error,fields,files){
		if(error){
			res.locals.error = error;
			res.redirect('/login');
			return;
		}
		var extName = '';  //后缀名
		switch (files.upload.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;		 
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;		 
		}
		if(extName.length == 0 ){
			res.redirect('/home');
		}
		fileName = Math.random() + '.' + extName;
		var newPath = form.uploadDir+'stuff/' + fileName;
		fs.renameSync(files.upload.path, newPath);  //重命名
		var readPath = '/images/stuff/'+fileName;



		//把数据存入数据库
		var showStuff = model.showStuff;
		showStuff.create({
			name:fields.stuffName,
			introduce:fields.stuffIntroduce,
			imgSrc:readPath,
			stuffEdi:global.stuffEdi,
			votes:0
		},function(error,doc){
			if(error){
				res.sendStatus(500);
			}else{
				console.log(doc);
			}
		});
		res.redirect('/home');

	});

})

module.exports = router;