const config = require('./webpackConfig');

module.exports = () => (
  config({
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
  })
);
