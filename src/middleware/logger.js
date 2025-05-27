//const logger = require('morgan');

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
module.exports = logger;