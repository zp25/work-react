const path = require('path');
const express = require('express');
const compression = require('compression');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const app = express();

const dist = path.resolve(__dirname, 'dist');
const index = path.resolve(__dirname, 'index.html');

/** const */
app.set('port', process.env.PORT || 8080);

/** compression */
app.use(compression())

/** static */
app.use('/dist', express.static(dist));

/** send all requests to index.html so browserHistory works */
app.get('*', (req, res) => {
  res.sendFile(index);
})

/** error handling middleware should be loaded after the loading the routes */
app.use(errorHandler());

/** engine start! */
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
