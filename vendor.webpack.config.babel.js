import path from 'path';
import webpack from 'webpack';

const APP = path.resolve(__dirname, 'app');
const DIST = path.resolve(__dirname, 'dist');

export default {
  target: 'web',
  context: APP,
  entry: {
    utils: ['babel-polyfill', 'md5'],
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router'],
  },
  output: {
    path: DIST,
    filename: '[name].bundle.js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DefinePlugin({
      // https://facebook.github.io/react/downloads.html#npm
      'process.env': {
        'NODE_ENV': '"production"',
      },
    }),

    new webpack.DllPlugin({
      path: path.resolve(DIST, '[name]-manifest.json'),
      name: '[name]_[hash]',
    }),

    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
};
