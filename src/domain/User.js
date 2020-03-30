const { attributes } = require('structure');
const validator = require('email-validator');
const { authorization } = require('ftauth');

const User = attributes({
  // Add atttributes here

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: String,
  firstName: {
    type: String,
    required: true
  },

  middleName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date,
})(class User {


  isAuth() {
    isTrue = (this.email && this.password);
    if(isTrue !== true){
      return ('Invalid Email or Password');
    }
    return isTrue;
    
  }

  isAdmin() {
    if(!authorization.getCurrentRole()) {
      return true;
    }
    isTrue = (authorization.getCurrentRole().toLowerCase() !== User.IS_ADMIN );
    if(this.role){
      if(isTrue) {
        return('Not allowed to change roles');
      }
    }
    return isTrue;
    
  }
  isValidRole() {
    if(this.role == undefined) {
      return true;
    }
    isTrue = (this.role.toLowerCase() === User.IS_ADMIN || this.role.toLowerCase() === User.IS_USER);
    if(!isTrue) {
      return ('Invalid Role Input, Must be Admin or User only!');
    }
    return isTrue;
      
    
  }

  isValidEmail() {
    if(this.email == undefined){
      return true;
    }

    isTrue = validator.validate(this.email);
    if(isTrue == true) {
      return isTrue;
    }
    else{
      return 'Please input a vaid email!';
    }
  }

  pwLength() {
    if(this.password == undefined) {
      return true;
    }
    isTrue = this.password.length >= User.MIN_PASSWORD_LENGTH;
    if(!isTrue) {
      return('Minimum password length is 6!');
    }
    return isTrue;
  }

  firstLength() {
    if(this.firstName == undefined) {
      return true;
    }
    isTrue = this.firstName.length >= User.MIN_INPUT_LENGTH;
    if(!isTrue) {
      return('Minimum firstName length is 4!');
    }
    return isTrue;
  }
  lastLength() {
    if(this.lastName == undefined) {
      return true;
    }
    isTrue = this.lastName.length >= User.MIN_INPUT_LENGTH;
    if(!isTrue) {
      return('Minimum lastName length is 4!');
    }
    return isTrue;
  }
  midLength() {
    if(this.middleName == undefined) {
      return true;
    }
    isTrue = this.middleName.length >= User.MIN_INPUT_LENGTH;
    if(!isTrue) {
      return('Minimum middleName length is 4!');
    }
    return isTrue;
  }


});

let isTrue;

User.MIN_PASSWORD_LENGTH = 6;
User.MIN_INPUT_LENGTH = 4;
User.IS_ADMIN = 'admin';
User.IS_USER = 'user';


module.exports = User;