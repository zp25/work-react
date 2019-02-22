const path = require('path');

const public = path.resolve(__dirname, '../public')

exports.SRC = path.resolve(__dirname, '../app');
exports.PUBLIC = public;
exports.DIST = path.resolve(__dirname, '../dist');
exports.TEMP = path.resolve(public, 'index.hbs');

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
