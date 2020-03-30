const { Router } = require('express');
const Status = require('http-status');


class UsersController {
  
  constructor() {
    
    this.injector = operation => (req, res, next) => {
      req['operation'] = req.container.resolve(operation);
      next();
    };
    const router = Router();

    router.put('/passwordChange/:id', this.injector('PasswordChange'), this.passwordChange);
    router.get('/profile/:id', this.injector('Profile'), this.show);
    router.get('/getMfa/:id', this.injector('GetMfa'), this.show);  
    router.put('/profileEdit/:id', this.injector('ProfileEdit'), this.profileEdit);  
    router.put('/setMfa/:id', this.injector('SetMfa'), this.setMFA);      
    router.delete('/deleteUser', this.injector('DeleteUser'), this.delete);

    return router;
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
