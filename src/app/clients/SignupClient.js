const { Operation } = require('@amberjs/core');
const config = require('config/index.js');
const Brewery = require('brewery-auth-test/src'); 
const auth = new Brewery(config.auth);



class SignupClient extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;



    try {
      const result  = await auth.signup(data);
      
      const { clientId, confirmationCode } = result;

      const confirmation = await auth.signupConfirm({ 
        clientId, 
        confirmationCode
      }, { subject:'The Brewery', text:'Welcome to the brewery' });

      return this.emit(SUCCESS, result);
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
