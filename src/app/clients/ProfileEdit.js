const { Operation } = require('@amberjs/core');
const auth = require('src/infra/authentication/BreweryAuth.js');

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
    
