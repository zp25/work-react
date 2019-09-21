/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { SRC } = require('./constants');

module.exports = ({ dev }) => {
  /**
   * loaderOptions
   */
  const {
    styleLoader,
    cssLoader,
    cssModuleLoader,
    postCssLoader,
    sassLoader,
  } = {
    // The loader automatically inject source maps when previous loader emit them
    // @link https://github.com/webpack-contrib/style-loader/pull/96
    styleLoader: dev ? 'style-loader' : {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: false,
      },
    },
    cssLoader: {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: dev,
      },
    },
    cssModuleLoader: {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]_[local]__[hash:base64:5]',
        },
        importLoaders: 2,
        sourceMap: dev,
      },
    },
    postCssLoader: {
      loader: 'postcss-loader',
      options: {
        sourceMap: dev,
        config: {
          path: path.resolve(__dirname, '../postcss.config.js'),
        },
      },
    },
    sassLoader: {
      loader: 'sass-loader',
      options: {
        sourceMap: dev,
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
            name: 'fonts/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    {
      test: /\.(mp3|mp4|webm)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        styleLoader,
        cssLoader,
        postCssLoader,
      ],
    },
    {
      test: /\.(scss|sass)$/,
      exclude: /\.module\.(scss|sass)$/,
      use: [
        styleLoader,
        cssLoader,
        postCssLoader,
        sassLoader,
      ],
    },
    {
      test: /\.module\.(scss|sass)$/,
      use: [
        styleLoader,
        cssModuleLoader,
        postCssLoader,
        sassLoader,
      ],
    },
    {
      test: /\.(hbs|handlebars)$/,
      use: ['handlebars-loader'],
    },
  ];
};
