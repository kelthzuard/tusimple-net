var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../common/model');
var util = require('util');
var fs = require('fs');
var model = require('../common/model');
var formidable = require('formidable');
var edtion = require('../common/edtion')

router.get('/',function(req,res,next){
	if(req.session.user){
		res.render('hoster');
	}else{
		res.redirect('/login');
	}
})

router.post('/',function(req,res,next){
	if(req.query.type === 'delete'){
		var stuffName = req.body.deleteData.name;
		var edi = req.body.deleteData.edition;
		var stuff = model.showStuff;
		stuff.findOne({name:stuffName,stuffEdi:edi},function(error,doc){
			if(error){
				console.log('error: '+error);
				res.sendStatus(404);
			}else{
				if(doc){
						stuff.remove({name:stuffName,stuffEdi:edi},function(error){
						if(error){
							console.log(error);
							res.sendStatus(404);
						}else{
							var src = './public'+doc.imgSrc;
							console.log(src);
							fs.unlink(src,function(error){
								if(error){console.log(error);}
								console.log('success deleted img');
							})
							console.log('success removed');
							res.sendStatus(200);
						}
							});
				}else{
					res.sendStatus(404);
				}
			}
		});

	}else if(req.query.type === 'add'){

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
			var newPath = form.uploadDir+'title/' + fileName;
			fs.renameSync(files.upload.path, newPath);  //重命名
			var readPath = '/images/title/'+fileName;

			edtion.addEdition(function(){
				//把数据存入数据库
				var title = model.title;
				title.create({
					titleEdi:global.stuffEdi,
					introduce:fields.introduce,
					titleImgSrc:readPath,
				},function(error,doc){
					if(error){
						res.sendStatus(500);
					}else{
						console.log(doc);

					}
				});
			})


			res.redirect('/home');

		});
	}
})

module.exports = router;