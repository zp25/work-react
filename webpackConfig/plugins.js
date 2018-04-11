const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const ManifestPlugin = require('../manifestPlugin');
const {
  SRC,
  DIST,
  TEMP,
  HTMLMINIFIER,
} = require('./constants');

module.exports = ({ dev }) => {
  const plugins = [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: SRC,
        sassLoader: {
          includePaths: ['node_modules'],
        },
      },
    }),
    new StyleLintPlugin({
      syntax: 'scss',
    }),
    new MiniCssExtractPlugin({
      filename: dev ?
        'styles/[name].css' :
        'styles/[name].[chunkhash:10].css',
    }),

    new HtmlWebpackPlugin({
      title: 'Template',
      filename: 'index.html',
      template: TEMP,
      minify: !dev && HTMLMINIFIER,
    }),
    new CopyWebpackPlugin([{
      from: 'assets/',
      to: DIST,
    }], {
      copyUnmodified: !dev,
    }),
  ];

  const devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
  ];

  const prodPlugins = [
    new SriPlugin({
      enabled: true,
      hashFuncNames: ['sha384', 'sha512'],
    }),

    new ManifestPlugin({
      path: process.cwd(),
      filename: 'manifest.json',
    }),
  ];

  return dev ?
    plugins.concat(devPlugins) :
    plugins.concat(prodPlugins);
};
