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

  const devServer = {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT) || 8080,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      maxModules: 15,
    },
  };

  const entry = {
    main: (DEV ? [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
      'webpack/hot/only-dev-server',
    ] : []).concat('./index'),
  };

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

  const rules = [
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
      test: /\.(jpe?g|png|gif|svg|webp)$/i,
      use: loaders.image,
    },
  ].concat(DEV ? [
    {
      test: /\.scss$/,
      use: [{ loader: 'style-loader' }].concat(loaders.style),
    }
  ] : [
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: loaders.style,
      }),
    }
  ]);

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
      new ExtractTextPlugin('styles.css'),
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

  const performance = {
    maxAssetSize: DEV ? 2000000 : 200000,
    maxEntrypointSize: DEV ? 4000000 : 400000,
  };

  return {
    target: 'web',
    devtool: DEV ? 'eval' : 'source-map',
    context: APP,
    entry,
    output: {
      path: DIST,
      filename: 'bundle.js',
      // https://github.com/webpack/css-loader/issues/232
      // publicPath: '/dist/',
      publicPath: `http://${devServer.host}:${devServer.port}/dist/`,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [APP, 'node_modules'],
    },
    module: { rules },
    plugins,
    devServer,
    performance,
  };
};
