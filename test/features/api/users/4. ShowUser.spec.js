const request = require('supertest');
const { expect } = require('chai');
const { getUserId } = require('test/support/userHelper');
const { getAdminToken } = require('test/support/tokenFactory');
const mochaAsync = require('test/support/mochaAsync');

describe('API :: GET /api/users/:id', () => {
  context('when credentials are invalid', () => {  
    it('returns 401 when user is not authenticated', mochaAsync(async () => {
      let res = await request('localhost:3001').get(`/api/users/${getUserId()}`);
      expect(res.status).to.equal(401);                            
    })
    );
  });
  context('when credentials are valid', () => {  
    it('returns user data when user exist', mochaAsync(async () => {
      let res = await request('localhost:3001')
        .get(`/api/users/${getUserId()}`)
        .set('Authorization', 'bearer ' + getAdminToken());
      expect(res.status).to.equal(200);                            
    })
    );
    // it('returns 404 when user is not found', mochaAsync(async () => {
    //   let res = await request('localhost:3001')
    //     .get(`/api/users/dummyid`)
    //     .set('Authorization', 'bearer ' + getAdminToken());
    //   expect(res.status).to.equal(404);                            
    // })
    // );
  });    
});
    