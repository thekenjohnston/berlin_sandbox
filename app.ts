var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var morgan = require('morgan');
var methodOverride = require('method-override');
var http = require('http');
var util = require('util');

var app = express();
var port = 5000;

var authRouter = require('./app/authentication/linkedin.routes')();

// set third party libraries
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(morgan());
app.use(session({secret: 'library'}));
app.use(passport.initialize());
app.use(passport.session());


// set routes
app.get('/', function(req, res){
    res.send('Hello World');
});

app.use('/auth', authRouter);

// start server
app.listen(port, function(err){
    console.log('running server on port ' + port);
});
