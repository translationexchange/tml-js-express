var express       = require('express');
var cookieParser  = require('cookie-parser');

var tr8n          = require('../../lib/index');

// Require a Tr8n cache adapter
// to prevent unnecessary api requests for translations
var tr8nRedis     = require('tr8n-redis');

var routes        = require('./routes/index');
var app           = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// Tr8n initialization
app.use(tr8n.init("<YOUR API KEY>", "<YOUR API SECRET>", {

  // configure the cache adapter
  cache: tr8nRedis({
    host: "localhost",
    port: 6379,
    timeout: 3600
  })
}));

app.use('/', routes);

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;