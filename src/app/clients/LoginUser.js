const { Operation } = require('@amberjs/core');
const config = require('config/index.js');
const Brewery = require('brewery-auth-test/src'); 
const auth = new Brewery(config.auth);



class LoginUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;
    const { clientId, clientSecret } = data;


    try {
      const tokens = await auth.login({ clientId, clientSecret });
      
      
      return this.emit(SUCCESS, tokens);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });
    }
  }
}

LoginUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginUser;
