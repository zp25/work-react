const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const ManifestPlugin = require('./manifestPlugin');
const {
  HTMLMINIFIER,
  VENDOR,
} = require('./constants');

module.exports = (env) => {
  const APP = path.resolve(__dirname, 'app');
  const DIST = path.resolve(__dirname, 'dist');
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
        sassLoader: {
          includePaths: ['node_modules'],
        },
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // 单独的manifest文件，提高缓存效率
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    }),

    new StyleLintPlugin({
      syntax: 'scss',
    }),
    new ExtractTextPlugin({
      filename: 'styles/styles.[contenthash:10].css',
      allChunks: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Template',
      filename: 'index.html',
      template: TEMP,
      minify: HTMLMINIFIER,
      // manifest文件以inline方式写入html
      inlineSource: 'manifest',
    }),
    new HtmlWebpackInlineSourcePlugin(),

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
      filename: 'scripts/[name].[chunkhash:10].js',
      chunkFilename: 'scripts/[name].[chunkhash:10].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [APP, 'node_modules'],
    },
    module: { rules },
    plugins,
  };
};
