const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { AUTOPREFIXER_CONFIG, VENDOR } = require('./constants');

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
      maxModules: 15,
    },
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
      minimize: false,
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
      name: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new ExtractTextPlugin({
      filename: 'styles/styles.css',
      allChunks: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: TEMP,
      inlineSource: 'manifest',
    }),
    new HtmlWebpackInlineSourcePlugin(),
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
      // https://github.com/webpack/css-loader/issues/232
      publicPath: `http://${devServer.host}:${devServer.port}/`,
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
