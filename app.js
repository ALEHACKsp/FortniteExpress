var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const bodyParser = require('body-parser')
const Request = require("request");
const cors = require('cors');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/api/store', function (req, res) {
  var options = {
    url: 'https://api.fortnitetracker.com/v1/store',
    method: 'GET',
    headers: {
      "TRN-Api-Key": "f92be6be-cb17-43c7-96e5-6a442ab5b65e"
    }
  };
  Request.get(options, (error, response,  body) => {
     if (error) {
          return console.dir(error);
      }
      const data = JSON.parse(body);
      res.status(200).send(data)
  });
 
});


app.get('/api/stats', function (req, res) {
  var username = req.query.username;
  var options = {
    url: `https://api.fortnitetracker.com/v1/profile/pc/${username}`,
    method: 'GET',
    headers: {
      "TRN-Api-Key": "f92be6be-cb17-43c7-96e5-6a442ab5b65e"
    }
  };
  Request.get(options, (error, response,  body) => {
     if (error) {
          return console.dir(error);
     }
      const data = JSON.parse(body);
      res.status(200).send(data)
  });
 
});

app.get('/api/history', function (req, res) {
  var accountID = req.query.accountID;
  var options = {
    url: `https://api.fortnitetracker.com/v1/profile/account/${accountID}/matches`,
    method: 'GET',
    headers: {
      "TRN-Api-Key": "f92be6be-cb17-43c7-96e5-6a442ab5b65e"
    }
  };
  Request.get(options, (error, response,  body) => {
     if (error) {
          return console.dir(error);
     }
      const data = JSON.parse(body);
      res.status(200).send(data)
  });
 
});

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
