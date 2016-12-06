const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');

const manifestUtils = require('./dist/utils-manifest.json');
const manifestVendor = require('./dist/vendor-manifest.json');

dotenv.config({ silent: true });

module.exports = (env) => {
  const DEV = env === 'DEVELOPMENT';
  const APP = path.resolve(__dirname, 'app');
  const DIST = path.resolve(__dirname, 'dist');
  const AUTOPREFIXER_BROWSERS = ['last 1 version'];

  const loaders = {
    prescript: ['eslint-loader'],
    script: ['babel-loader'],
    style: [
      {
        loader: 'css-loader',
        query: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'sass-loader',
        query: {
          sourceMap: true,
        },
      },
    ],
    image: [
      // {
      //   loader: 'url-loader',
      //   options: {
      //     name: DEV ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
      //     limit: 10000,
      //   },
      // },
      {
        loader: 'file-loader',
        options: {
          name: DEV ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        },
      },
    ],
  };

  const plugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: !DEV,
      debug: false,
      options: {
        context: APP,
        postcss: [
          autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
        ],
        sassLoader: {
          includePaths: ['node_modules'],
        },
      },
    }),
    new webpack.DefinePlugin({
      // https://facebook.github.io/react/downloads.html#npm
      'process.env': {
        'NODE_ENV': DEV ? JSON.stringify('development') : JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin('styles.css'),

    new webpack.DllReferencePlugin({
      context: DIST,
      manifest: manifestUtils,
    }),
    new webpack.DllReferencePlugin({
      context: DIST,
      manifest: manifestVendor,
    }),

    ...(DEV ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
        },
      }),
    ])
  ];

  const devServer = {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT) || 8080,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  };

  return {
    target: 'web',
    devtool: DEV ? 'eval' : 'source-map',
    context: APP,
    entry: {
      main: (DEV ? [
          'react-hot-loader/patch',
          `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
          'webpack/hot/only-dev-server',
        ] : []).concat(['./index']),
    },
    output: {
      path: DIST,
      filename: 'bundle.js',
      publicPath: '/dist/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [APP, 'node_modules'],
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          include: APP,
          use: loaders.prescript,
        },
        {
          test: /\.jsx?$/,
          include: APP,
          use: loaders.script,
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: loaders.style,
          }),
        },
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/i,
          use: loaders.image,
        },
      ]
    },
    plugins,
    devServer,
  };
};
