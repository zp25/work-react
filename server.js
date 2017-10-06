const path = require('path');
const express = require('express');
const compression = require('compression');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const app = express();

const static = path.resolve(__dirname, 'dist');
const index = path.resolve(static, 'index.html');

/** const */
app.set('port', process.env.PROD_PORT || 8081);

/** compression */
app.use(compression());

/** static */
app.use(express.static(static));

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
