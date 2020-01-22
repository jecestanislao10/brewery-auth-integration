const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');
const bcrypt = require('bcrypt');

class CreateUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const user = new User(data);
    // const hashedPassword = await bcrypt.hash(user.password, 12);
    // user.password = hashedPassword;

    try {
      const newUser = await this.UserRepository.add(user.toJSON());

      this.emit(SUCCESS, newUser);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
