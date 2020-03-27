const { Router } = require('express');
const Status = require('http-status');
const { authorization } = require('ftauth');



class UsersController {
  
  constructor() {
    
    this.injector = operation => (req, res, next) => {
      req['operation'] = req.container.resolve(operation);
      next();
    };
    const router = Router();

    router.get('/users', this.injector('ListUsers'), this.index);
    router.get('/users/:id', this.injector('ShowUser'), this.show);
    router.put('/users/:id', this.injector('UpdateUser'), this.update);      
    router.delete('/users/:id', this.injector('DeleteUser'), this.delete);

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

  show(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { message: 'User data', result: result } });
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



  update(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, () => {
        res
          .status(Status.ACCEPTED)
          .json({ status: Status.ACCEPTED, details: { message: 'Following fields has been Updated!', result: Object.keys(req.body)} });
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          status: Status.BAD_REQUEST,
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          status: Status.NOT_FOUND,
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    if(req.role.toLowerCase() !== 'admin'){
      if(req.params.id !== req.userId){
        return res
          .status(Status.FORBIDDEN)
          .json({
            status: Status.FORBIDDEN,
            type: 'AUTHORIZATION ERROR',
            details: 'Not Authorized'
          });
      }
    }
    authorization.setCurrentRole(req.role);
    operation.execute((req.params.id), req.body);
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
      .on(NOT_FOUND, () => {
        res.status(Status.NOT_FOUND).json({
          status: Status.NOT_FOUND,
          type: 'NotFoundError',
          details: 'User does not exists!'
        });
      })
      .on(ERROR, next);

    operation.execute(req.params.id);
  }
}

module.exports = UsersController;
