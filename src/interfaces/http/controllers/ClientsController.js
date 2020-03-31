const { Router } = require('express');
const Status = require('http-status');

class ClientsController {
  
  constructor() {
    
    this.injector = operation => (req, res, next) => {
      req['operation'] = req.container.resolve(operation);
      next();
    };
    const router = Router();

    router.post('/login', this.injector('LoginUser'), this.login);
    router.post('/users', this.injector('CreateUser'), this.create);
    router.post('/signupClient', this.injector('SignupClient'), this.signup);
    router.post('/signupResend', this.injector('SignupResend'), this.resend);
    router.post('/register', this.injector('RegisterClient'), this.register);
    router.post('/loginNewPassword', this.injector('LoginNewPassword'), this.loginNew);
    router.post('/loginMfa', this.injector('LoginMfa'), this.loginMfa);
    router.put('/passwordReset/:id', this.injector('PasswordReset'), this.passwordReset);
    router.post('/passwordForgot/:id', this.injector('PasswordForgot'), this.passwordForgot);

    return router;
  }

  passwordReset(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { result: result } });
      }).on(ERROR, (err) => {
        res.status(400).json({
          status: 400, 
          details: err,
          message: 'code expired/ invalid'
        });
      });

    operation.execute(req.params.id, req.body);
  }

  passwordForgot(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { result: result } });
      })
      .on(NOT_FOUND, (err) => {
        res.status(400).json({
          status: 400, 
          details: err
        });
      })
      .on(ERROR, next);

    operation.execute((req.params.id));
  };
  
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

  signup(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.CREATED)
          .json({ status: Status.CREATED, details: { message: 'Client Created!', result } });
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

  resend(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.CREATED)
          .json({ status: Status.CREATED, details: { message: 'Resend code success!', result } });
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

  register(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.CREATED)
          .json({ status: Status.CREATED, details: { message: 'Client Registered!', result } });
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

  loginNew(req, res) {
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

  loginMfa(req, res) {
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
}

module.exports = ClientsController;
