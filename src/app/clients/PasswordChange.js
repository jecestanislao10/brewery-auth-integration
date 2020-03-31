const { Operation } = require('@amberjs/core');
const auth = require('src/infra/authentication/BreweryAuth.js');

class PasswordChange extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id, body) {
    const { SUCCESS, ERROR } = this.events;

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
    
