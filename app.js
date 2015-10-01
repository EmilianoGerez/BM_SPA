var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var configDB = require('./server/config/configDB');



// Register Models
var counter = require('./server/models/counter');
var Product = require('./server/models/product.server.model');
var Category = require('./server/models/category.server.model');
var ProductCode = require('./server/models/product-code.server.model');
var Credit = require('./server/models/credit.server.model');
var Invoice = require('./server/models/invoice.server.model');
var Register = require('./server/models/register.server.model');

// Register Server Routes
var routes = require('./server/routes/index');
var apiRoutes = require('./server/routes/api');
//var users = require('./routes/users');

// Conect DB
mongoose.connect('mongodb://localhost:27017/MdzVirtualDB', function(err) {
    if (err) {
        console.log(err);
    }
});

// Set Express
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware routing
app.use('/', routes);
app.use('/api', apiRoutes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
