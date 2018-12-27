/* eslint import/no-extraneous-dependencies: ["error", { "peerDependencies": true }] */

const autoprefixer = require('autoprefixer');

module.exports = ctx => ({
  parser: ctx.parser ? 'sugarss' : false,
  plugins: [
    autoprefixer(),
  ],
});
