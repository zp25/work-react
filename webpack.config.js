const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const { VENDOR } = require('./constants');

dotenv.config({ silent: true });

module.exports = (env) => {
  const APP = path.resolve(__dirname, 'app');
  const DIST = path.resolve(__dirname, 'dist');
  const TEMP = path.resolve(__dirname, 'views/layouts/main.hbs');

  const devServer = {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT) || 8080,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
      modules: false,
      hash: true,
      timings: true,
      version: true,
    },
    // disableHostCheck: true,
  };

  const entry = {
    main: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
      'webpack/hot/only-dev-server',
      './index',
    ],
    vendor: VENDOR,
  };

  const loaders = {
    prescript: ['eslint-loader'],
    script: ['babel-loader'],
    style: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true,
          /** @see {@link https://github.com/webpack-contrib/style-loader/pull/96} */
          convertToAbsoluteUrls: true,
        },
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    image: [
      // {
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //   },
      // },
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]?[sha1:hash:base64:10]',
        },
      },
    ],
    template: ['handlebars-loader'],
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
    {
      test: /\.scss$/,
      use: loaders.style,
    },
    {
      test: /\.(hbs|handlebars)$/,
      use: loaders.template,
    },
  ];

  const plugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false,
      options: {
        context: APP,
        sassLoader: {
          includePaths: ['node_modules'],
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),

    new StyleLintPlugin({
      syntax: 'scss',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: TEMP,
    }),
    new CopyWebpackPlugin([{
      from: 'assets/',
      to: DIST,
    }], {
      copyUnmodified: false,
    }),

    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
  ];

  return {
    target: 'web',
    devtool: 'eval-cheap-module-source-map',
    context: APP,
    entry,
    output: {
      path: DIST,
      filename: 'scripts/[name].js',
      chunkFilename: 'scripts/[name].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [APP, 'node_modules'],
    },
    module: { rules },
    plugins,
    devServer,
  };
};
