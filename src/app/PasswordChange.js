const { Operation } = require('@amberjs/core');
const Brewery = require('brewery-auth-test/src/index');
const config = require('config/index.js');
const auth = new Brewery(config.auth);

class PasswordChange extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id, body) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.events;

    try {
      const change = await auth.passwordChange(id, body);
      this.emit(SUCCESS, change);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

PasswordChange.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = PasswordChange;
    
