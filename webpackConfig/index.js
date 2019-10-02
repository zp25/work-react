/* eslint import/no-extraneous-dependencies: 0 */

const merge = require('webpack-merge');
const dotenv = require('dotenv');

const { SRC, DIST } = require('./constants');
const optimization = require('./optimization');
const plugins = require('./plugins');
const rules = require('./rules');
const devServer = require('./devServer');

dotenv.config();

module.exports = (customopts = {}) => {
  const dev = process.env.NODE_ENV === 'development';

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 8080;
  const index = process.env.INDEX || 'index.html';

  const opts = {
    target: 'web',
    context: SRC,
    entry: {
      main: './index',
    },
    output: {
      path: DIST,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
      modules: [SRC, 'node_modules'],
      alias: {
        '@': SRC,
      },
    },
    module: { rules: rules({ dev }) },
    plugins: plugins({ dev, index }),
  };

  const devopts = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
      filename: 'scripts/[name].js',
      chunkFilename: 'scripts/[name].js',
    },
    devServer: devServer({ host, port, index }),
  };

  const prodopts = {
    mode: 'production',
    devtool: 'source-map',
    output: {
      filename: 'scripts/[name].[chunkhash:10].js',
      chunkFilename: 'scripts/[name].[chunkhash:10].js',
      // sri
      crossOriginLoading: 'anonymous',
    },
    optimization: optimization(),
    stats: {
      // Examine all modules
      maxModules: Infinity,
      // Display bailout reasons
      optimizationBailout: true,
    },
  };

  const envopts = dev ? devopts : prodopts;

  return merge(
    opts,
    envopts,
    customopts,
  );
};
