const { Router } = require('express');
const Status = require('http-status');


class UsersController {
  
  constructor() {
    
    this.injector = operation => (req, res, next) => {
      req['operation'] = req.container.resolve(operation);
      next();
    };
    const router = Router();

    router.put('/passwordReset/:id', this.injector('PasswordReset'), this.passwordReset);
    router.put('/passwordChange/:id', this.injector('PasswordChange'), this.passwordChange);
    router.post('/passwordForgot/:id', this.injector('PasswordForgot'), this.passwordForgot);
    router.get('/profile/:id', this.injector('Profile'), this.show);
    router.get('/getMfa/:id', this.injector('GetMfa'), this.show);  
    router.put('/profileEdit/:id', this.injector('ProfileEdit'), this.profileEdit);  
    router.put('/setMfa/:id', this.injector('SetMfa'), this.setMFA);      
    router.delete('/deleteUser', this.injector('DeleteUser'), this.delete);

    return router;
  }
  
  login(req, res) {
    const { operation } = req;
    const { SUCCESS, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { message: 'Logged in successfully!', result: result} }).end();
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
  /**
   * CRUD sample implementation
   * You may delete the commented code below if you have extended BaseController class
   * The following methods are already inherited upon extending BaseController class from @amberjs/core
   */

  index(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, NOT_FOUND} = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { message: 'List of Users', result: result } });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          status: Status.NOT_FOUND,
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute();
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
  }

  setMFA(req, res, next) {
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
      .on(ERROR, (err) => {
        res.status(400).json({
          status: 400, 
          details: err
        });
      });

    operation.execute(req.params.id, req.body);
  }

  passwordChange(req, res, next) {
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
          details: err
        });
      });

    operation.execute(req.params.id, req.body);
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
  show(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { message: 'List of User', result: result } });
      })
      .on(NOT_FOUND, () => {
        res.status(Status.NOT_FOUND).json({
          status: Status.NOT_FOUND,
          type: 'NotFoundError',
          details: 'User does not exists!'
        });
      })
      .on(ERROR, next);

    operation.execute((req.params.id));
  }

  create(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.CREATED)
          .json({ status: Status.CREATED, details: { message: 'User Created!', user: result } });
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

  profileEdit(req, res, next) {
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
          details: err
        });
      });

    operation.execute(req.params.id, req.body);
  }
  delete(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, () => {
        res
          .status(Status.OK)
          .json({status: Status.OK, details: { message: 'Successfully deleted!' }}).end();
      })
      .on(ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({Status: 400, Error: error});
      });

    operation.execute(req.body);
  }
}

module.exports = UsersController;
