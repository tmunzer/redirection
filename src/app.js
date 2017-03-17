var path = require('path');

var express = require('express');
var morgan = require('morgan')
var parseurl = require('parseurl');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var redirection = require("/app/config").redirection;

var app = express();
app.use(morgan('\x1b[32minfo\x1b[0m: :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
    var src_host = req.headers.host;
    if (redirection[src_host]) {
	res.redirect("https://"+redirection[src_host]);
	console.info("\x1b[32minfo\x1b[0m:",src_host + " redirected to " + redirection[src_host]);
    } else console.error("\x1b[31mERROR\x1b[0m:", "unknown redirection " + src_host);
});

module.exports = app;
