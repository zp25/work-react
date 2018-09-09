const path = require('path');
const express = require('express');
const compression = require('compression');
const ms = require('ms');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const app = express();

const static = path.resolve(__dirname, 'dist');
const index = path.resolve(static, 'index.html');

app.set('port', process.env.PROD_PORT || 8081);

// Use Helmet
app.disable('x-powered-by');

// middleware
app.use(compression());

// serve-static
const icons = [
  'favicon.png',
  'icon@iphone.png',
  'icon@iphone-plus.png',
];

icons.forEach((icon) => {
  app.use(`/${icon}`, express.static(path.resolve(static, icon), { maxAge: ms('0.5y') }));
});

app.use(express.static(static, {
  // SRI
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-transform');
  },
}));

/** send all requests to index.html so browserHistory works */
app.get('*', (req, res) => {
  res.sendFile(index);
});

if (app.get('env') === 'development') {
  console.log('Development mode');
  app.use(errorHandler());
}

/** engine start! */
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
