const { Operation } = require('@amberjs/core');
const auth = require('src/infra/authentication/BreweryAuth.js');

class SetMfa extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id, data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;


    try {    
      const updatedMfa = await auth.setMfa(id, data);
      console.log(updatedMfa);
      
      this.emit(SUCCESS, updatedMfa);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });      
    }
  }
}

SetMfa.setEvents(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = SetMfa; 
    
