const path = require('path');

exports.SRC = path.resolve(__dirname, '../app');
exports.DIST = path.resolve(__dirname, '../dist');
exports.TEMP = path.resolve(__dirname, '../views/layouts/main.hbs');

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
