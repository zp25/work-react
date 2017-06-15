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
  'prop-types',
  'react',
  'react-dom',
  'redux',
  'react-redux',
];

module.exports = {
  HTMLMINIFIER,
  VENDOR,
};
