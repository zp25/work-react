const autoprefixer = require('autoprefixer');

const { AUTOPREFIXER_CONFIG } = require('./constants');

module.exports = ctx => ({
  parser: ctx.parser ? 'sugarss' : false,
  plugins: [
    autoprefixer(AUTOPREFIXER_CONFIG),
  ],
});
