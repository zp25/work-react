/* eslint import/no-extraneous-dependencies: 0 */

/**
 * production only
 */

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => ({
  concatenateModules: true,
  minimizer: [
    new TerserPlugin({
      // Enable cache and multi-process parallel running
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
    new OptimizeCssAssetsPlugin(),
  ],
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      // Extracting all CSS in a single file
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
