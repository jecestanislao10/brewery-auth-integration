const { Operation } = require('@amberjs/core');
const Brewery = require('brewery-auth-test/src/index');
const config = require('config/index.js');
const auth = new Brewery(config.auth);

class ProfileEdit extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id, data) {
    const { SUCCESS, ERROR } = this.events;


    try {    
      const updatedUser = await auth.profileEdit(id, data);
      
      this.emit(SUCCESS, updatedUser);
    } catch(error) {
      this.emit(ERROR, {
        type: 'VALIDATION ERROR',
        details: error
      });      
    }
  }
}

ProfileEdit.setEvents(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = ProfileEdit; 
    
