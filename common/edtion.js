var mongoose = require('mongoose');
var model = require('./model');

function getEdition(){
	var Edition;
	var edi = model.edtion;
	edi.find({},function(error,doc){
		Edition = doc[0].editionNum;
		global.stuffEdi = Edition;
		console.log('Edition: '+global.stuffEdi);
	});

}

function addEdition(callback){
	var Edition = global.stuffEdi;
	var addEdition = Edition+1;
	var edi = model.edtion;
	edi.update({editionNum:Edition},{$set:{editionNum:addEdition}},function(error,result){
		if(error){
			console.log(error);
		}else{
			global.stuffEdi = addEdition;
			callback();
		}
	})
}

module.exports = {
	getEdition:getEdition,
	addEdition:addEdition
};