/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');

const pub = path.resolve(__dirname, '../public');

exports.SRC = path.resolve(__dirname, '../app');
exports.PUBLIC = pub;
exports.DIST = path.resolve(__dirname, '../dist');
exports.TEMP = path.resolve(pub, 'index.hbs');

exports.HTMLMINIFIER = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};
