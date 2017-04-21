var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var session = require('express-session');
var crypto = require('crypto');




var users = require('./routes/users');
var home = require('./routes/home');
var model = require('./common/model');
var edtion = require('./common/edtion');
var addStuff = require('./routes/addStuff');
var login = require('./routes/login');
var hoster = require('./routes/hoster');





mongoose.connect('mongodb://localhost:27017/testDb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connnection successful')
});


edtion.getEdition();//从数据库读取版本号并设置

/*setTimeout(function(){
    edtion.addEdition(function(){
    console.log('callback function is working');
  });
},5000);
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'12345',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:600000}      
}));
//引入路由

app.use('',home);
app.use('/users', users);
app.use('/home',home);
app.use('/addStuff',addStuff);
app.use('/login',login);
app.use('/hoster',hoster);



//ioTest
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});









// catch 404 and forward to error handler
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(3000,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})

module.exports = app;
