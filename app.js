var express = require('express');
var app = express();

var destinations = require('./scripts/destinations');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/'))

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/test', function (req, res) {
	res.render('index', {
			title: "test",
			destinations: destinations.allDestinations()
	});
});

app.get('/json', function (req, res) {
	res.json(destinations.allDestinations())
});

app.listen(3000);