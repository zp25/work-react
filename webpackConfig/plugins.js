/* eslint import/no-extraneous-dependencies: ["error", { "peerDependencies": true }] */

const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
const ManifestPlugin = require('../webpackPlugins/manifestPlugin');
const {
  SRC,
  PUBLIC,
  DIST,
  TEMP,
  HTMLMINIFIER,
} = require('./constants');

dotenv.config({ silent: true });

module.exports = dev => (env = {}) => {
  const { quiet } = env;

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
    }], {
      copyUnmodified: !dev,
    }),
  ];

  const devPlugins = [
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

    ...(quiet ? [] : [
      new BundleAnalyzerPlugin({
        analyzerPort: process.env.ANALYZER_PORT || 3001,
      }),
    ]),

    new ManifestPlugin({
      path: process.cwd(),
      filename: 'manifest.json',
    }),
  ];

  if (dev) {
    plugins.push(...devPlugins);
  } else {
    plugins.push(...prodPlugins);
  }

  return plugins;
};
