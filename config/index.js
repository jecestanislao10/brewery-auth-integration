const appConfigs = require('./app');
const logging = require('./logging');
const auth = require('./auth');

module.exports = {
  app: appConfigs,
  logging,
  auth
};