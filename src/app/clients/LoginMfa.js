const { Operation } = require('@amberjs/core');
const auth = require('src/infra/authentication/BreweryAuth.js');

class LoginMfa extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;
    const { clientId, confirmationCode } = data;


    try {
      const tokens = await  auth.loginMfa({ clientId, confirmationCode });

      
      return this.emit(SUCCESS, tokens);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });
    }
  }
}

LoginMfa.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginMfa;