/**
 * development only
 */

module.exports = ({
  host,
  port,
  index,
}) => ({
  host,
  port,
  inline: true,
  hot: true,
  // historyApiFallback: true,
  historyApiFallback: {
    rewrites: [
      {
        from: /./,
        to: `/${index}`,
      },
    ],
  },
  stats: {
    colors: true,
    chunks: false,
    modules: false,
    hash: true,
    timings: true,
    version: true,
  },
  open: true,
  // disableHostCheck: true,
});
