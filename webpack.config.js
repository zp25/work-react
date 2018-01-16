const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const { HTMLMINIFIER } = require('./constants');

const manifestUtils = require('./dll/utils-manifest.json');
const manifestVendor = require('./dll/vendor-manifest.json');

dotenv.config({ silent: true });

module.exports = (env) => {
  const DEV = env && env.development;
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
    main: DEV ? [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
      'webpack/hot/only-dev-server',
      './index',
    ] : ['./index'],
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
      //     name: '[path][name].[ext]?[sha1:hash:base64:10]',
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
      use: DEV ? loaders.style : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: loaders.style.slice(1),
      }),
    },
    {
      test: /\.(hbs|handlebars)$/,
      use: loaders.template,
    },
  ];

  const plugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: !DEV,
      debug: false,
      options: {
        context: APP,
        sassLoader: {
          includePaths: ['node_modules'],
        },
      },
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: manifestUtils,
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: manifestVendor,
    }),

    new ExtractTextPlugin({
      filename: 'styles/styles.css',
      allChunks: false,
      disable: DEV,
    }),
    new StyleLintPlugin({
      syntax: 'scss',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: TEMP,
      minify: !DEV && HTMLMINIFIER,
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: require.resolve('./dll/utils'),
        outputPath: 'scripts',
        publicPath: '/scripts',
        includeSourcemap: true,
      },
      {
        filepath: require.resolve('./dll/vendor'),
        outputPath: 'scripts',
        publicPath: '/scripts',
        includeSourcemap: true,
      },
    ]),

    new CopyWebpackPlugin([{
      from: 'assets/',
      to: DIST,
    }], {
      copyUnmodified: !DEV,
    }),

    ...(DEV ? [
      new webpack.HotModuleReplacementPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
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

  const config = {
    target: 'web',
    devtool: DEV ? 'eval-cheap-module-source-map' : 'source-map',
    context: APP,
    entry,
    output: {
      path: DIST,
      filename: 'scripts/bundle.js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [APP, 'node_modules'],
    },
    module: { rules },
    plugins,
  };

  return DEV ? Object.assign({}, config, { devServer }) : config;
};
