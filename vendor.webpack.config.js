const path = require('path');
const webpack = require('webpack');

const APP = path.resolve(__dirname, 'app');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  target: 'web',
  context: APP,
  entry: {
    utils: ['babel-polyfill', 'history', 'redux-thunk'],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-addons-controlled',
    ],
  },
  output: {
    path: DIST,
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DefinePlugin({
      // https://facebook.github.io/react/downloads.html#npm
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    new webpack.DllPlugin({
      path: path.resolve(DIST, '[name]-manifest.json'),
      name: '[name]_[hash]',
    }),

    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    }),
  ],
};
