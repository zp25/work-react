import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'

const DEBUG = process.env.NODE_ENV === 'development';
const APP = path.resolve(__dirname, 'app');
const AUTOPREFIXER_BROWSERS = ['last 1 version'];

export default {
  target: 'web',
  devtool: DEBUG ? '#eval' : '#source-map',
  context: APP,
  entry: {
    main: (DEBUG ? [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server'
      ] : []).concat(['./enter']),
    html: './index.html',
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: APP,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.html$/,
        include: APP,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.scss$/,
        include: path.resolve(APP, 'styles'),
        loaders: [
          'style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass?sourceMap'
        ]
      },
      {
        test: /\.jsx?$/,
        include: APP,
        loader: `${DEBUG ? 'react-hot!' : ''}babel`
      },
      {
        test: /\.(png|jpg)$/,
        include: path.resolve(APP, 'images'),
        loader: 'url',
        query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000,
        },
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: DEBUG
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

    ...(DEBUG ? [
      new webpack.HotModuleReplacementPlugin()
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false
        },
      })
    ])
  ],
  postcss: () => {
    return [
      autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })
    ];
  }
};
