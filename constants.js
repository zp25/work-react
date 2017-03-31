const AUTOPREFIXER_CONFIG = { browsers: ['last 1 version'] };

const HTMLMINIFIER = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

const VENDOR = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
];

module.exports = {
  AUTOPREFIXER_CONFIG,
  HTMLMINIFIER,
  VENDOR,
};
