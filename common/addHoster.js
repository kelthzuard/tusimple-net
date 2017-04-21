var mongoose = require('mongoose');
var model = require('./model');
var crypto = require('crypto');

function addHoster(id,passWord){
	var md5 = crypto.createHash('md5');
  	var userId = md5.update(id).digest('base64');
  	var Md5 = crypto.createHash('md5');
  	var password = Md5.update(passWord).digest('base64');
  	var user = model.user;
  	user.create({
    	name:userId,
    	password:password
  	},function(error,doc){
    	console.log(doc);
  	});
}

module.exports = addHoster;