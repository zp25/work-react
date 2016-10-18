import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import manifestUtils from './dist/utils-manifest.json';
import manifestVendor from './dist/vendor-manifest.json';

const DEBUG = process.env.NODE_ENV === 'development';
const APP = path.resolve(__dirname, 'app');
const AUTOPREFIXER_BROWSERS = ['last 1 version'];

export default {
  target: 'web',
  devtool: DEBUG ? '#cheap-module-eval-source-map' : '#source-map',
  context: APP,
  entry: {
    main: (DEBUG ? [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
      ] : []).concat(['./enter']),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  resolve: {
    root: [APP],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: APP,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.scss$/,
        include: path.resolve(APP, 'styles'),
        loader: ExtractTextPlugin.extract('style', [
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass?sourceMap'
        ]),
      },
      {
        test: /\.jsx?$/,
        include: APP,
        loader: `${DEBUG ? 'react-hot!' : ''}babel`,
      },
      // {
      //   test: /\.(png|jpg)$/,
      //   include: path.resolve(APP, 'images'),
      //   loader: 'url',
      //   query: {
      //     name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
      //     limit: 10000,
      //   },
      // },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        include: path.resolve(APP, 'images'),
        loader: 'file',
        query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        },
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: DEBUG,
      // 移除开发环境插件，如redux-logger
      'process.env': {
        'NODE_ENV': DEBUG ? '"development"' : '"production"',
      },
    }),
    new ExtractTextPlugin('styles.css'),

    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, 'dist'),
      manifest: manifestUtils,
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, 'dist'),
      manifest: manifestVendor,
    }),

    ...(DEBUG ? [
      new webpack.HotModuleReplacementPlugin()
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false
        },
      }),
      new webpack.optimize.OccurenceOrderPlugin(true),
    ])
  ],
  postcss: () => {
    return [
      autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })
    ];
  }
};
