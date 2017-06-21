'use strict';

describe('[NEGATIVE] FI-SEED API USERS as USER', () => {
  describe('[POST /users]', () => {
    it('should respond a 409 error status code', (done) => {
      req.post({
        url: '/api/users',
        body: mock.user,
        json: true
      }, (err, res) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.be.a('number');
        expect(res.statusCode).to.equal(409);

        done();
      });
    });
  });
});
