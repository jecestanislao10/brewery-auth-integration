const { Operation } = require('@amberjs/core');
const BreweryAuth = require('brewery-auth-test/src'); 



class SignupResend extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;

    try {
      const auth  = new BreweryAuth(config);
      
      const result = await auth.signupResend(data);



      return this.emit(SUCCESS, result);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });
    }
  }
}

SignupResend.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = SignupResend;
