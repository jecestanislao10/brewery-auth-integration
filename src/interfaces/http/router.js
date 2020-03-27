const { Router, static } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');
const path = require('path');
const openApiDoc = require('./openApi.json');
// const unless = require('express-unless');
const BreweryAuth = require('brewery-auth-test/src'); 

module.exports = ({ config, notFound, containerMiddleware, loggerMiddleware, errorHandler, openApiMiddleware }) => {
  const router = Router();

  const configurations = {
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

  const auth = new BreweryAuth(configurations);
  
  router.use(containerMiddleware);


  /* istanbul ignore if */
  if(config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();


  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use('/docs', openApiMiddleware(openApiDoc))
    .use(auth.initialize());
  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   * Avoid hardcoding in this file as much. Deleting comments in this file
   * may cause errors on scaffoldings
   */

  apiRouter.use(controller('controllers/AuthController.js'));
  apiRouter.use(auth.JWTauthenticate());
  apiRouter.use(controller('controllers/UsersController.js'));


  /* apiRoutes END */
  router.use('/api', apiRouter);
  router.use('/', static(path.join(__dirname, './public')));
  router.use('/', notFound);

  router.use(errorHandler);

  return router;
};
