const { Operation } = require('@amberjs/core');
const BreweryAuth = require('brewery-auth-test/src'); 



class SignupClient extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;
    console.log(data);
    /* signup fields:
        email, 
        password, 
        username, 
        phone, 
        MFA
    */

    const config = {
      dbConfig: {
        databaseName: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        authSecret: process.env.SECRET1,
        authSecret2: process.env.SECRET2,
      },
      salt: process.env.SALT,
      nexmoSecret: process.env.NEXMO_API_SECRET,
      nexmoKey: process.env.NEXMO_API_KEY,
      sendgridKey: process.env.SENDGRID_API_KEY,
      senderEmail: process.env.SENDER_EMAIL,
      senderSms: process.env.SENDER_SMS
    };


    try {
      const auth  = new BreweryAuth(config);
      
      const result = await auth.signup(data);
      const { clientId, confirmationCode } = result;

      const confirmation = await auth.signupConfirm({ 
        clientId, 
        confirmationCode
      }, { subject:'The Brewery', text:'Welcome to the brewery' });
      

      return this.emit(SUCCESS, result);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });
    }
  }
}

SignupClient.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = SignupClient;
