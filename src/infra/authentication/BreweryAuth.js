const Brewery = require('brewery-auth-test/src/index');
const config = require('config/index.js');
const auth = new Brewery(config.auth);

module.exports = auth;