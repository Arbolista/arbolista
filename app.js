console.log("=== app.js ===")
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.locals = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
 * Assets & Static
 */
console.log("=== Assets ===")
// raw data and images.
console.log("=== a ===")
app.use(express.static(path.join(__dirname, 'public')));
console.log("=== b ===")
// serve angular jade templates as html
var jadeStatic = require("connect-jade-static");
app.use(jadeStatic({
    baseDir: path.join(__dirname, '/assets/js/angular/lib'),
    baseUrl: '/templates',
    maxAge: 100,
    jade: { pretty: true }
}));
console.log("=== c ===")
// compile CSS and Javascript library into application.js & application.css
app.use(require("connect-assets")({
	paths: ["assets/js", "assets/css", "bower_components"]
}));

/*
 * Routing and translation
 */
console.log("=== Routing and Translation ===")
var handlers = require(__dirname + "/routes/route_handlers"),
	routeAndTranslate = require(__dirname + "/config/route_and_translate"),
	handleErrors = require(__dirname + "/config/handle_errors"),
	listen = require(__dirname + "/config/listen");

console.log("A")
routeAndTranslate(app, handlers, function(){
  console.log("B")
	handleErrors(app, function(){
    console.log("C")
		listen(app);
	});
});

module.exports = app;

