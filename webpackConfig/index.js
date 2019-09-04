/* eslint import/no-extraneous-dependencies: 0 */

const merge = require('webpack-merge');
const dotenv = require('dotenv');

const { SRC, DIST } = require('./constants');
const optimization = require('./optimization');
const plugins = require('./plugins');
const rules = require('./rules');

dotenv.config();

module.exports = (customopts = {}) => {
  const dev = process.env.NODE_ENV === 'development';

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
    plugins: plugins({ dev }),
  };

  const devopts = {
    mode: 'development',
    output: {
      filename: 'scripts/[name].js',
      chunkFilename: 'scripts/[name].js',
    },
    devServer: {
      host: process.env.HOST || 'localhost',
      port: Number(process.env.PORT) || 8080,
      inline: true,
      hot: true,
      // historyApiFallback: true,
      historyApiFallback: {
        rewrites: [
          {
            from: /./,
            to: `/${process.env.INDEX || 'index.html'}`,
          },
        ],
      },
      stats: {
        colors: true,
        chunks: false,
        modules: false,
        hash: true,
        timings: true,
        version: true,
      },
      open: true,
      // disableHostCheck: true,
    },
  };

  const prodopts = {
    mode: 'production',
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
