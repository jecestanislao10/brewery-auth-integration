const { Operation } = require('@amberjs/core');
const Brewery = require('brewery-auth-test/src/index');
const config = require('config/index.js');
const auth = new Brewery(config.auth);

class DeleteUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(body) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.events;

    try {
      const data = await auth.deleteUser(body);
      this.emit(SUCCESS, data);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

DeleteUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = DeleteUser;
    
