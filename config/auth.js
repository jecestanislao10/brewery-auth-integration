require('dotenv').config();
const db = require('src/infra/dataSources/Db.js');

module.exports = {
  dbConfig: {
    databaseName: db.config.database,
    username: db.config.username,
    password: db.config.password,
    dialect: db.config.dialect,
    host: db.config.host
  },
  salt: process.env.SALT,
  tokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  nexmoSecret: process.env.NEXMO_API_SECRET,
  nexmoKey: process.env.NEXMO_API_KEY,
  sendgridKey: process.env.SENDGRID_API_KEY,
  senderEmail: process.env.SENDER_EMAIL,
  senderSms: process.env.SENDER_SMS
};