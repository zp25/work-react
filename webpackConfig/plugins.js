/* eslint import/no-extraneous-dependencies: 0 */

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const dotenv = require('dotenv');

const {
  SRC,
  PUBLIC,
  DIST,
  TEMP,
  HTMLMINIFIER,
} = require('./constants');

dotenv.config();

module.exports = ({ dev }) => {
  const plugins = [
    new webpack.LoaderOptionsPlugin({
      debug: dev,
      options: {
        context: SRC,
        sassLoader: {
          includePaths: ['node_modules'],
        },
      },
    }),
    new StyleLintPlugin(),

    new HtmlWebpackPlugin({
      filename: process.env.INDEX || 'index.html',
      template: TEMP,
      minify: !dev && HTMLMINIFIER,
    }),
    new CopyWebpackPlugin([{
      from: PUBLIC,
      to: DIST,
      ignore: ['*.hbs'],
      flatten: true,
    }], {
      copyUnmodified: !dev,
    }),
  ];

  const devPlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ];

  const prodPlugins = [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:10].css',
    }),

    new SriPlugin({
      enabled: true,
      hashFuncNames: ['sha384', 'sha512'],
    }),
  ];

  if (dev) {
    plugins.push(...devPlugins);
  } else {
    plugins.push(...prodPlugins);
  }

  return plugins;
};
