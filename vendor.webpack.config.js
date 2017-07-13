const path = require('path');
const webpack = require('webpack');
const {
  UTILS,
  VENDOR,
} = require('./constants');

const APP = path.resolve(__dirname, 'app');
const DLL = path.resolve(__dirname, 'dll');

module.exports = {
  target: 'web',
  devtool: 'source-map',
  context: APP,
  entry: {
    utils: UTILS,
    vendor: VENDOR,
  },
  output: {
    path: DLL,
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(DLL, '[name]-manifest.json'),
      context: __dirname,
      name: '[name]_[hash]',
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    }),
  ],
};
