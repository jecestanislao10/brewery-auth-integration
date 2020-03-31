const { Operation } = require('@amberjs/core');
const auth = require('src/infra/authentication/BreweryAuth.js');

class DeleteUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(body) {
    const { SUCCESS, ERROR } = this.events;

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
    
