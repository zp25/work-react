module.exports = dev => (env = {}) => ({ // eslint-disable-line no-unused-vars
  // concatenateModules: true,
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.scss$/,
        chunks: 'all',
        enforce: true,
      },
    },
  },
  runtimeChunk: true,
});
