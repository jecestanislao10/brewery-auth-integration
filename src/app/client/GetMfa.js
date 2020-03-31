const { Operation } = require('@amberjs/core');
const Brewery = require('brewery-auth-test/src/index');
const config = require('config/index.js');
const auth = new Brewery(config.auth);

class GetMfa extends Operation {
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
      const mfa = await auth.getMfa(id);
      this.emit(SUCCESS, mfa);

    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetMfa.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GetMfa;
    
