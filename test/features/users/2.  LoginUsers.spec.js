const { setUserToken, setAdminToken } = require('test/support/tokenFactory');
const { setUserId } = require('test/support/userHelper');
const request = require('supertest');
const { expect } = require('chai');
const { getUserCredentials, getAdminCredentials } = require ('test/support/userHelper');
const mochaAsync = require('test/support/mochaAsync');


describe('API :: POST /api/login', () => {

  context('when credentials are valid', () => {
    it('returns 200', mochaAsync(async () => { 
      let res = await request('https://final-amberjs-task.herokuapp.com')
        .post('/api/login')
        .send(getAdminCredentials());
      expect(res.status).to.equal(200);
      const obj = JSON.parse(res.text);
      setAdminToken(obj.details.result.token);
    }));
    it('returns token with userId', mochaAsync(async () => {
      let res = await request('https://final-amberjs-task.herokuapp.com').post('/api/login')
        .send(getUserCredentials());
      const obj = JSON.parse(res.text);
      const resultObj = obj.details.result;
      const { token, userId } = resultObj;
      
      setUserToken(token);
      setUserId(userId);
      expect(resultObj).to.have.property('token');
      expect(resultObj).to.have.property('userId');   
    }));

  });

  context('when credentials are invalid', () => {
    it('returns 401', mochaAsync(async () => {
      let res = await request('https://final-amberjs-task.herokuapp.com').post('/api/login')
        .send({
          email: 'jagustin@stratpoint.com',
          password: '1'
        });
      expect(res.status).to.equal(401); 

    }));
  });
});