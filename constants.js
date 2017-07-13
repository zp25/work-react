const HTMLMINIFIER = {
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

const UTILS = [
  'history',
  'redux-thunk',
];

const VENDOR = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
];

module.exports = {
  HTMLMINIFIER,
  UTILS,
  VENDOR,
};
