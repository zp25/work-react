const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SRC } = require('./constants');

module.exports = ({ dev }) => {
  // const styleLoader = [
  //   {
  //     loader: 'style-loader',
  //     options: {
  //       sourceMap: true,
  //       // @see {@link https://github.com/webpack-contrib/style-loader/pull/96}
  //       convertToAbsoluteUrls: true,
  //     },
  //   },
  // ];

  const imageLoader = [
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65,
        },
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: '65-90',
          speed: 4,
        },
        webp: {
          quality: 75,
        },
      },
    },
  ];

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
      use: ['babel-loader'],
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
        ...(dev ? [] : imageLoader)
      ],
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
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
    },
    {
      test: /\.(hbs|handlebars)$/,
      use: ['handlebars-loader'],
    },
  ];
};
