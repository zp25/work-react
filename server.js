var path = require('path');
var express = require('express');
var compression = require('compression');
var errorHandler = require('errorhandler');

var app = express()

var dist = path.resolve(__dirname, 'dist');

/** const */
app.set('port', process.env.PORT || 8080);

/** compression */
app.use(compression())

/** static */
app.use(express.static(dist));

/** send all requests to index.html so browserHistory works */
app.get('*', function (req, res) {
  res.sendFile(path.resolve(dist, 'index.html'))
})

/** error handling middleware should be loaded after the loading the routes */
if (app.get('env') === 'development') {
  console.log('Development mode');
  app.use(errorHandler());
}

/** engine start! */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
