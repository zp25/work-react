/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { SRC } = require('./constants');

module.exports = (env = {}) => { // eslint-disable-line no-unused-vars
  const dev = process.env.NODE_ENV !== 'production';

  /**
   * loaderOptions
   */
  const {
    styleLoader,
    miniCssLoader,
  } = {
    styleLoader: {
      loader: 'style-loader',
      options: {
        sourceMap: dev,
        // @see {@link https://github.com/webpack-contrib/style-loader/pull/96}
        convertToAbsoluteUrls: true,
      },
    },
    miniCssLoader: {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: dev,
      },
    },
  };

  return [
    {
      enforce: 'pre',
      test: /\.jsx?$/,
      include: SRC,
      use: ['eslint-loader'],
    },
    {
      test: /\.jsx?$/,
      include: [
        SRC,
        path.resolve(__dirname, '../node_modules/zp-lib'),
      ],
      use: {
        loader: 'babel-loader',
        options: {
          // default cache directory: ./node_modules/.cache/babel-loader/
          cacheDirectory: true,
        },
      },
    },
    {
      test: /\.(jpe?g|png|gif|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: dev
              ? '[path][name].[ext]?[sha256:hash:base64:7]'
              : '[path][sha256:hash:base64:7].[ext]',
          },
        },
      ],
    },
    {
      test: /\.(ttf|otf|eot|woff2?)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    },
    {
      test: /\.mp3$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    },
    {
      test: /\.(scss|css)$/,
      use: [
        ...(dev ? [styleLoader] : [miniCssLoader]),
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
            importLoaders: 2,
            sourceMap: dev,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: dev,
            config: {
              path: path.resolve(__dirname, '../postcss.config.js'),
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: dev,
          },
        },
      ],
    },
    {
      test: /\.(hbs|handlebars)$/,
      use: ['handlebars-loader'],
    },
  ];
};
