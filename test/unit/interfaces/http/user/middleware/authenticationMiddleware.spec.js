const { expect } = require('chai');
const mocks = require('node-mocks-http');
const authMiddleware = require('src/interfaces/http/middlewares/authenticationMiddleware');
const sinon = require('sinon');
const {authentication, paths} = require('ftauth');

describe('Infra :: http :: Middlewares :: authenticationMiddleware', () => {

  context('checks if user is authenticated', () => {
    it('executes next if authenticated', () => {
      const middleware = authMiddleware;
      const nextSpy = sinon.spy();
      const res = mocks.createResponse();
      const req = mocks.createRequest();

      sinon.stub(paths, 'checkPath');
      paths.checkPath.returns(true);
      sinon.stub(authentication, 'verifyToken');
      authentication.verifyToken.returns({ userId: 'abc' });

      middleware(req, res, nextSpy);

      expect(nextSpy.calledOnce).to.be.true;
      authentication.verifyToken.restore();
    });

    it('returns error if not authenticated', () => {
      const middleware = authMiddleware;
      const next = sinon.spy();
      const res = mocks.createResponse();
      const req = mocks.createRequest();

      middleware(req, res, next);

      const response = res._getJSONData();
      expect(response.status).to.equal(401);
    });
  });
});