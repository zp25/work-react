/* eslint import/no-extraneous-dependencies: ["error", { "peerDependencies": true }] */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = ({ env }) => ({
  plugins: [
    autoprefixer(),
    // @link https://github.com/postcss/postcss-loader/issues/353
    ...(env === 'production' ? [cssnano({ preset: 'default' })] : []),
  ],
});
