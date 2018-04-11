const rules = require('./rules');
const plugins = require('./plugins');
const optimization = require('./optimization');

if (process.env.NODE_ENV === 'production') {
  exports.rules = rules({ dev: false });
  exports.plugins = plugins({ dev: false });
  exports.optimization = optimization({ dev: false });
} else {
  exports.rules = rules({ dev: true });
  exports.plugins = plugins({ dev: true });
  exports.optimization = optimization({ dev: false });
}
