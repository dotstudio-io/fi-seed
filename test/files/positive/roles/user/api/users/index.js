'use strict';

describe('FI-SEED API USERS as USER', () => {
  describe('[POST /users]', () => {
    it('should respond a 201 status code and the created user ID', (done) => {
      req.post({
        url: '/api/users',
        body: mock.user,
        json: true
      }, (err, res, body) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.be.a('number');
        expect(res.statusCode).to.equal(201);
        expect(body).to.be.a('string');

        done();
      });
    });
  });

  describe('[POST /users/sign-out]', () => {
    it('should respond a 204 status code', (done) => {
      req.post('/api/users/sign-out', (err, res, body) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.be.a('number');
        expect(res.statusCode).to.equal(204);
        expect(body).to.to.be.empty;

        done();
      });
    });
  });


  describe('[POST /users/sign-in]', () => {
    it('should respond a 204 status code', (done) => {
      req.post({
        url: '/api/users/sign-in',
        body: mock.user,
        json: true
      }, (err, res) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.be.a('number');
        expect(res.statusCode).to.equal(200);

        done();
      });
    });


    after((done) => {

      req('/api/session', (err, res, body) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.be.a('number');
        expect(res.statusCode).to.equal(200);

        body = JSON.parse(body);

        expect(body.roles).to.be.an('array');
        expect(body.name).to.be.a('string');
        expect(body._id).to.be.a('string');

        done();
      });
    });
  });
});
