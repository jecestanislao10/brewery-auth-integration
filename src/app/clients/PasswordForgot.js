const { Operation } = require('@amberjs/core');
const auth = require('src/infra/authentication/BreweryAuth.js');

class PasswordForgot extends Operation {
  constructor(UserRepository) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND, ERROR} = this.events;

    if (!id) {
      return this.emit(ERROR, {
        type: 'ERROR',
        details: 'Empty parameters.'
      });
    }

    try {
      const profile = await auth.passwordForgot({
        clientId: id
      });
      this.emit(SUCCESS, profile);

    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

PasswordForgot.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = PasswordForgot;
    
