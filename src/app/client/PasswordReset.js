const { Operation } = require('@amberjs/core');
const Brewery = require('brewery-auth-test/src/index');
const config = require('config/index.js');
const auth = new Brewery(config.auth);

class PasswordReset extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id, body) {
    const { SUCCESS, ERROR } = this.events;

    try {
      body.clientId = id;
      console.log(body);
      const change = await auth.passwordReset(body);
      this.emit(SUCCESS, change);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

PasswordReset.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = PasswordReset;
    
