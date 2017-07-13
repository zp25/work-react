const autoprefixer = require('autoprefixer');

module.exports = ctx => ({
  parser: ctx.parser ? 'sugarss' : false,
  plugins: [
    autoprefixer(),
  ],
});
