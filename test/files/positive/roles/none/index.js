'use strict';

describe('FI-SEED', () => {
  describe('[GET /]', () => {
    it('should respond a 200 status code and return application body', (done) => {
      req('/', (err, res, body) => {
        expect(err).to.be.null;

        expect(res.statusCode).to.be.a('number');
        expect(res.statusCode).to.equal(200);

        expect(body).to.to.be.an.object;

        done();
      });
    });
  });
});
