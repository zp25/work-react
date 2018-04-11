module.exports = ({ dev }) => ({
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.scss$/,
        chunks: 'all',
        enforce: true
      },
    },
  },
  runtimeChunk: true,
})
