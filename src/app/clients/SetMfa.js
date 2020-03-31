const { Operation } = require('@amberjs/core');
const Brewery = require('brewery-auth-test/src/index');
const config = require('config/index.js');
const auth = new Brewery(config.auth);

class SetMfa extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id, data) {
    const { SUCCESS, VALIDATION_ERROR, ERROR } = this.events;


    try {    
      
      if (!id || !data) {
        return this.emit(ERROR, {
          type: 'ERROR',
          details: 'Empty parameters.'
        });
      }

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
    
