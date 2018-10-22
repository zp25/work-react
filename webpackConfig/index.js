const rules = require('./rules');
const plugins = require('./plugins');
const optimization = require('./optimization');

const dev = process.env.NODE_ENV !== 'production';

exports.rules = rules(dev);
exports.plugins = plugins(dev);
exports.optimization = optimization(dev);
