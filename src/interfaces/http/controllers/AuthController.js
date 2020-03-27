const { Router } = require('express');
const Status = require('http-status');




class AuthController {
  
  constructor() {
    
    this.injector = operation => (req, res, next) => {
      req['operation'] = req.container.resolve(operation);
      next();
    };
    const router = Router();

    router.post('/login', this.injector('LoginUser'), this.login);
    router.post('/users', this.injector('CreateUser'), this.create);


    return router;
  }
  
  login(req, res) {
    const { operation } = req;
    const { SUCCESS, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { message: 'Logged in successfully!', result: result} })
          .end();

      })
      .on(VALIDATION_ERROR,  (result) => {
        res
          .status(Status.UNAUTHORIZED)
          .json({
            status: Status.UNAUTHORIZED,
            type: result.type,
            details: result.details
          }).end();
      });



    operation.execute(req.body);
  }

  create(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.CREATED)
          .json({ status: Status.CREATED, details: { message: 'User Created!', userId: result.id } });
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          status: Status.BAD_REQUEST,
          type: error.type,
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(req.body);
  }

}

module.exports = AuthController;
