var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');



var indexRouter = require('./routes/index');
 
var usersRouter = require('./routes/users');
var gazalRouter = require('./routes/gazalrouter');
var articleRouter=require('./routes/articleRouter');
var shyriRouter = require('./routes/shyriRouter')
var nazmRouter = require('./routes/nazmRouter');
var carouselRouter = require('./routes/carouselRouter');
var uploadRouter=require('./routes/uploadRouter');

 const mongoose=require('mongoose');
mongoose.Promise=require('bluebird');

const Gazals = require('./models/gazals');
const Articles=require('./models/articles');
const Carousels=require('./models/carousels');
const Shyris=require('./models/shyris');
const Nazms=require('./models/nazms');


const url = config.mongoUrl;
const connect = mongoose.connect(url,{
  useMongoClient:true
});
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();
app.all('*',(req,res,next)=>{
  if(req.secure){
    return next();
  }
  else{
    res.redirect(307,'https://'+req.hostname+':'+app.get('secPort')+req.url);
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//uncomment after placing your favicon in/public/images
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//app.use(cookieParser('12345-67890-09876-54321'));


app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);



 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/gazals',gazalRouter);
app.use('/articles',articleRouter);
app.use('/shyris',shyriRouter);
app.use('/nazms',nazmRouter);
app.use('/carousels',carouselRouter);
app.use('/imageUpload',uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err=new Error('Not Found');
  err.status=404;
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

module.exports = app;
