const {
  rules,
  plugins,
  optimization,
} = require('./webpackConfig');
const { SRC, DIST } = require('./webpackConfig/constants');

module.exports = env => ({
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
    extensions: ['.js', '.jsx', '.json', '.scss'],
    modules: [SRC, 'node_modules'],
  },
  module: { rules: rules(env) },
  plugins: plugins(env),
  optimization: optimization(env),
  stats: {
    // Examine all modules
    maxModules: Infinity,
    // Display bailout reasons
    optimizationBailout: true,
  },
});
