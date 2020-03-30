const request = require('supertest');
const { expect } = require('chai');
const { getAdminToken, getUserToken } = require('test/support/tokenFactory');
const mochaAsync = require('test/support/mochaAsync');
const { getUserId } = require('test/support/userHelper');

describe('API :: PUT /api/users/:id', () => {
  context('when user is authenticated', () => {
    context('when user is AUTHORIZED', () => {
      context('when input data is valid', () => {
        it('USER : returns 202 and updates user data', mochaAsync(async() => {
          let res = await request('https://final-amberjs-task.herokuapp.com')
            .put(`/api/update?id=${getUserId()}`)
            .set('Authorization', 'bearer ' + getUserToken())
            .send({
              firstName: 'newFirst',
              lastName: 'newLast'
            });
          const obj = JSON.parse(res.text);
          expect(obj.status).to.equal(202);
          expect(obj.details.result).to.be.an('array');
        }));

        it('ADMIN : returns 202 and updates user data', mochaAsync(async() => {
          let res = await request('https://final-amberjs-task.herokuapp.com')
            .put(`/api/update?id=${getUserId()}`)
            .set('Authorization', 'bearer ' + getAdminToken())
            .send({
              firstName: 'newFirst',
              lastName: 'newLast'
            });
          const obj = JSON.parse(res.text);
          expect(obj.status).to.equal(202);
          expect(obj.details.result).to.be.an('array');
        }));
      });
      context('when sent data is invalid', () => {
        it('returns 400 with validation error', mochaAsync(async () => {
          let res = await request('https://final-amberjs-task.herokuapp.com').put(`/api/update?id=${getUserId()}`)
            .set('Authorization', 'bearer ' + getAdminToken())
            .send({
              email: 'm',
              password: 'a',
              firstName: 'l',
              lastName: 'i',
              middleName: '!'
            })
            .expect(400);
          const obj = JSON.parse(res.text);
          const messageObj = obj.details.message;

          expect(obj.type).to.equal('ValidationError');
          expect(messageObj[0]).to.equal('Please input a vaid email!');
          expect(messageObj[1]).to.equal('Minimum password length is 6!');
          expect(messageObj[2]).to.equal('Minimum firstName length is 4!');
          expect(messageObj[3]).to.equal('Minimum lastName length is 4!');
          expect(messageObj[4]).to.equal('Minimum middleName length is 4!');
        }));
      });

    });
    context('when user is Not Authorized', () => {
      it('returns 403 with the message', mochaAsync(async()=> {
        let res = await request('https://final-amberjs-task.herokuapp.com')
          .put('/api/update?id=otherUserId')
          .set('Authorization', 'bearer ' + getUserToken())
          .expect(403);

        const obj = JSON.parse(res.text).message; 
        expect(obj).to.be.equal('Unauthorized');             
      }));
    });


  });

  context('when user does not exist', () => {
    it('returns 400 with the NotFoundError', mochaAsync(async() => {

      let res = await request('https://final-amberjs-task.herokuapp.com')
        .put(`/api/update?id=${getUserId+'wrong'}`)
        .set('Authorization', 'bearer ' + getAdminToken())
        .send({
          firstName: 'tryToEdit'
        })
        .expect(400);
    
      const obj = JSON.parse(res.text);
      expect(obj.details).to.equal('NotFoundError');
    }));
  });

});
