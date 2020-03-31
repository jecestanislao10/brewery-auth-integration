const { Operation } = require('@amberjs/core');
const Brewery = require('brewery-auth-test/src/index');
const config = require('config/index.js');
const auth = new Brewery(config.auth);

class Profile extends Operation {
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
      const profile = await auth.profile(id);
      this.emit(SUCCESS, profile);

    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

Profile.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = Profile;
    
