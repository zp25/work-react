const dotenv = require('dotenv');
const {
  rules,
  plugins,
  optimization,
} = require('./webpackConfig');
const { SRC, DIST } = require('./webpackConfig/constants');

dotenv.config({ silent: true });

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  context: SRC,
  entry: {
    main: './index',
  },
  output: {
    path: DIST,
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    modules: [SRC, 'node_modules'],
  },
  module: { rules },
  plugins,
  optimization,
  devServer: {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT) || 8080,
    inline: true,
    hot: true,
    historyApiFallback: true,
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
