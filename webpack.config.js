/* eslint import/no-extraneous-dependencies: 0 */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ManifestPlugin = require('./webpackPlugins/manifestPlugin');

const config = require('./webpackConfig');

module.exports = (env = {}) => {
  const { quiet } = env;

  if (process.env.NODE_ENV === 'development') {
    return config({
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    });
  }

  return config({
    plugins: [
      ...(quiet ? [] : [
        new BundleAnalyzerPlugin({ analyzerPort: 3001 }),
      ]),

      // test等环境不输出
      ...(process.env.NODE_ENV === 'production' ? [
        new ManifestPlugin({
          path: process.cwd(),
          filename: 'manifest.json',
        }),
      ] : []),
    ],
  });
};
