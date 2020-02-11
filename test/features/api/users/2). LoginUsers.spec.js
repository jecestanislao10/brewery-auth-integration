const { setToken } = require('test/support/tokenFactory');
const { setUserId } = require('test/support/userHelper');
const request = require('supertest');
const { expect } = require('chai');
const { getUserCredentials } = require ('test/support/userHelper');
const mochaAsync = require('test/support/mochaAsync');


describe('API :: POST /api/login', () => {

  context('when credentials are valid', () => {
    it('returns 200', mochaAsync(async () => { 
      let res = await request('localhost:' + process.env.PORT)
        .post('/api/login')
        .send(getUserCredentials());
      expect(res.status).to.equal(200);
    }));
    it('returns token with userId', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT).post('/api/login')
        .send(getUserCredentials());
      const obj = JSON.parse(res.text);
      console.log(obj);
      setToken(obj.details.result.token);
      setUserId(obj.details.result.userId);
      expect(obj.details.result).to.have.property('token');
      expect(obj.details.result).to.have.property('userId');   
    }));

  });

  context('when credentials are invalid', () => {
    it('returns 401', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT).post('/api/login')
        .send({
          email: 'jagustin@stratpoint.com',
          password: '1'
        });
      expect(res.status).to.equal(401); 

    }));
  });
});