const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ManifestPlugin = require('./manifestPlugin');
const {
  AUTOPREFIXER_CONFIG,
  HTMLMINIFIER,
  VENDOR,
} = require('./constants');

module.exports = (env) => {
  const APP = path.resolve(__dirname, 'app');
  const DIST = path.resolve(__dirname, 'dist');
  // const INDX = path.resolve(__dirname, 'index.html');
  const TEMP = path.resolve(__dirname, 'views/layouts/main.hbs');

  const entry = {
    main: './index',
    vendor: VENDOR,
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
      {
        loader: 'file-loader',
        options: {
          name: '[path][sha1:hash:base64:10].[ext]',
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
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: loaders.style,
      }),
    },
    {
      test: /\.(hbs|handlebars)$/,
      use: loaders.template,
    },
  ];

  const plugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: APP,
        postcss: [
          autoprefixer(AUTOPREFIXER_CONFIG),
        ],
        sassLoader: {
          includePaths: ['node_modules'],
        },
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'scripts/vendor.[chunkhash:10].js',
    }),
    new ExtractTextPlugin({
      filename: 'styles/styles.[contenthash:10].css',
      allChunks: false,
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

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: TEMP,
      minify: HTMLMINIFIER,
    }),
    new CopyWebpackPlugin([{
      from: 'assets/',
      to: DIST,
    }], {
      copyUnmodified: true,
    }),
    new ManifestPlugin({
      path: process.cwd(),
      filename: 'manifest.json',
    }),
  ];

  return {
    target: 'web',
    devtool: 'source-map',
    context: APP,
    entry,
    output: {
      path: DIST,
      filename: 'scripts/bundle.[chunkhash:10].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [APP, 'node_modules'],
    },
    module: { rules },
    plugins,
  };
};
