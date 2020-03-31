const { Operation } = require('@amberjs/core');
const auth = require('src/infra/authentication/BreweryAuth.js');

class LoginNewPassword extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;
    const { clientId, newPassword } = data;


    try {
      const tokens = await auth.loginNewPasswordRequired({ clientId, newPassword });

      
      return this.emit(SUCCESS, tokens);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });
    }
  }
}

LoginNewPassword.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginNewPassword;
