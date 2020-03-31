const { Operation } = require('@amberjs/core');
const Brewery = require('brewery-auth-test/src/index');
const config = require('config/index.js');
const auth = new Brewery(config.auth);


class SignupClient extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;

    /* signup fields:
        email, 
        password, 
        username, 
        phone, 
        MFA
    */


    try {
      
      const result = await auth.signup(data);
      const { clientId, confirmationCode } = result;

      const confirmation = await auth.signupConfirm({ 
        clientId, 
        confirmationCode
      }, { subject:'The Brewery', text:'Welcome to the brewery' });

      return this.emit(SUCCESS, confirmation);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });
    }
  }
}

SignupClient.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = SignupClient;
