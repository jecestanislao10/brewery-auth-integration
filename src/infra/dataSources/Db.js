// FOR PRODUCTION
// module.exports = {
//   name: 'db',
//   connector : 'sql',
//   config: {
//     host: 'remotemysql.com',
//     password: 'Ac1CKjMlBz',
//     database: 'EnqgAk0Wrg',
//     dialect: 'mysql',
//     isSync: 'true',

//   }
// };
// FOR TESTING
// module.exports = {
//   name: 'db',
//   connector : 'sql',
//   config: {
//     host: 'localhost',
//     username: 'root',
//     password: 'root',
//     database: 'yourdatabase',
//     dialect: 'mysql',
//     isSync: 'true',

//   }
// };
// module.exports = {
//   name: 'test-db',
//   connector : 'sql',
//   config: {
//     host: 'remotemysql.com',
//     username: 'I3pzK8hI33',
//     password: 'i2kDmahSWR',
//     database: 'I3pzK8hI33',
//     dialect: 'mysql',
//     isSync: 'true',

//   }
// };
module.exports = {
  name: 'test-db',
  connector : 'sql',
  config: {
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'dev-database',
    dialect: 'postgres',
    isSync: 'true',

  }
};