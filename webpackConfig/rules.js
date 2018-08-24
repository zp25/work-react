const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SRC } = require('./constants');

module.exports = ({ dev }) => {
  const styleLoader = {
    loader: 'style-loader',
    options: {
      sourceMap: true,
      // @see {@link https://github.com/webpack-contrib/style-loader/pull/96}
      convertToAbsoluteUrls: true,
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
      include: SRC,
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
            name: dev ?
              '[path][name].[ext]?[sha1:hash:base64:10]' :
              '[path][sha1:hash:base64:10].[ext]',
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        ...(dev ? [styleLoader] : [MiniCssExtractPlugin.loader]),
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
            config: {
              path: path.resolve(__dirname, '../postcss.config.js'),
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
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
