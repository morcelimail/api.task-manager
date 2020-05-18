const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const globals = require('globals');

const config = require('./config');
const libs = require('./libs');
const app = express();

// global modules
globals.config = config;
globals.libs = libs;
globals.models = require('./models');
globals.schemas = require('./schemas');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", config.cors.origin);
	res.header("Access-Control-Allow-Headers", config.cors.headers);
	res.header("Access-Control-Allow-Methods", config.cors.methods);
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
libs.router.generate(app, path.join(__dirname, 'routes'));

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
