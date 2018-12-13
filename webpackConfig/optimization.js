module.exports = dev => (env = {}) => ({
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
