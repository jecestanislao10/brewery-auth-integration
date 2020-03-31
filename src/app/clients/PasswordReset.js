const { Operation } = require('@amberjs/core');
const auth = require('src/infra/authentication/BreweryAuth.js');

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
    
