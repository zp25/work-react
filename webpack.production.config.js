const {
  rules,
  plugins,
  optimization,
} = require('./webpackConfig');
const { SRC, DIST } = require('./webpackConfig/constants');

module.exports = {
  target: 'web',
  mode: 'production',
  devtool: 'source-map',
  context: SRC,
  entry: {
    main: './index',
  },
  output: {
    path: DIST,
    filename: 'scripts/[name].[chunkhash:10].js',
    chunkFilename: 'scripts/[name].[chunkhash:10].js',
    publicPath: '/',
    // sri
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [SRC, 'node_modules'],
  },
  module: { rules },
  plugins,
  optimization,
  stats: {
    // Examine all modules
    maxModules: Infinity,
    // Display bailout reasons
    optimizationBailout: true,
  },
};
