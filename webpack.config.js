const config = require('./webpackConfig');

module.exports = () => (
  config({
    devtool: 'cheap-module-eval-source-map',
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
  })
);
