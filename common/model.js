var mongoose = require('mongoose');

var showStuffSchema = mongoose.Schema({
	name: { type: String,required: true },
	introduce: { type: String,required: true },
	imgSrc: { type: String,required : true },
	stuffEdi: {type: Number,required: true},
	votes: {type: Number,default: 0 }
});

var titleSchema = mongoose.Schema({
	titleEdi: { type: Number,required: true,default: 1},
	introduce: { type: String,required: true },
	titleImgSrc: { type: String,required: true }
});

var userSchema = mongoose.Schema({
	name: { type: String,required: true },
	password: { type: String,required: true }
});

var ediNumSchema = mongoose.Schema({
	editionNum: { type: Number,required: true }
});

exports.showStuff = mongoose.model('showStuff',showStuffSchema);
exports.title = mongoose.model('title',titleSchema);
exports.user = mongoose.model('user',userSchema);
exports.edtion = mongoose.model('edtion',ediNumSchema);