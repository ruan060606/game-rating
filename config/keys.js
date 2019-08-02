if (process.env.NODE_ENV === 'production') {
  // we are in proudction
  module.exports = require('./prod');
} else {
  // we are in development
  module.exports = require('./dev');
}
