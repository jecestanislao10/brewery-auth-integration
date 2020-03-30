// FOR PRODUCTION
// module.exports = {
//   name: 'db',
//   connector : 'sql',
//   config: {
//     host: 'remotemysql.com',
//     username: 'EnqgAk0Wrg',
//     password: 'Ac1CKjMlBz',
//     database: 'EnqgAk0Wrg',
//     dialect: 'mysql',
//     isSync: 'true',

//   }
// };
// FOR TESTING
module.exports = {
  name: 'db',
  connector : 'sql',
  config: {
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'yourdatabase',
    dialect: 'mysql',
    isSync: 'true',

  }
};
