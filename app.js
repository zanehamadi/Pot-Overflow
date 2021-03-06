const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { restoreUser } = require('./auth');
const { sequelize } = require('./db/models');

const indexRouter = require('./routes/index');
const questionsRouter = require('./routes/questions')
const searchRouter = require('./routes/search')
const profileRouter = require('./routes/profile-page')

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: 'superSecret',
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

// routes
app.use(restoreUser);
app.use('/', indexRouter);
app.use('/search', searchRouter)
app.use('/questions', questionsRouter);
app.use('/profile', profileRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err,req,res,next) {
  if(err.status === 404){
    res.statusCode = 404;
    return res.render('404error');
  }
  next(err);
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.statusCode || 500);
  res.render('error');
});

module.exports = app;
