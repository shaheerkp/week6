var createError = require('http-errors');
var express = require('express');
var path = require('path');
const handlebars=require('express-handlebars')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload=require('express-fileupload')

 var db=require('./dbconfig/connection')
 var session = require('express-session')
 

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs',handlebars({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts',partialsDir:__dirname+'/views/partials'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

db.connect((err)=>{
  if (err) 
    console.log("Connetion error"+err);
    else
    console.log("database connected");
    
  
})

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:6000000 }
}))


 


app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use(fileUpload())

 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
   
  next(createError(404));
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
