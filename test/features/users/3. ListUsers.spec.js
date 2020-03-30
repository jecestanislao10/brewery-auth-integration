const request = require('supertest');
const { expect } = require('chai');
const { getAdminToken, getUserToken } = require('test/support/tokenFactory');
const mochaAsync = require('test/support/mochaAsync');

describe('API :: GET /api/users', () => {
  context('when user is authenticated', () => {
    context('when user role is "user"', () => {
      context('user is Not Authorized', () => {
        it('returns 403 with the message', mochaAsync(async()=> {
          let res = await request('https://final-amberjs-task.herokuapp.com')
            .get('/api/users')
            .set('Authorization', 'bearer ' + getUserToken())
            .expect(403);
          const obj = JSON.parse(res.text).message; 
          expect(obj).to.be.equal('Unauthorized');             
        }));
      });
    });
    context('when user role is "admin"', () => {
      context('user is AUTHORIZED', () => {
        context('when users exists', () => {
          it('returns 200 with the user data', mochaAsync(async () => {
            let res = await request('https://final-amberjs-task.herokuapp.com')
              .get('/api/users')
              .set('Authorization', 'bearer ' + getAdminToken())
              .expect(200);
      
            const obj = JSON.parse(res.text);      
            expect(obj.details.message).to.not.be.empty();                        
          }));
        });
        context('when user does not exists', () => {
          it('returns 200 but with the NotFound error', mochaAsync(async () => {
            let res = await request('https://final-amberjs-task.herokuapp.com')
              .get('/api/users')
              .set('Authorization', 'bearer ' + getAdminToken())
              .expect(200);

            const obj = JSON.parse(res.text);
            let [...cloneResult] = obj.details.result;
            cloneResult = []; 
            expect(cloneResult).to.have.lengthOf(0);                          
          }));
        });
      });
    });

  });

  context('when user is not authenticated', () => {  
    it('returns 401 with the message', mochaAsync(async () => {
      let res = await request('https://final-amberjs-task.herokuapp.com')
        .get('/api/users')
        .expect(401);

      const obj = JSON.parse(res.text);     
      expect(obj.message).to.equal('Not Authenticated');                            
    }));
  });  
});
    