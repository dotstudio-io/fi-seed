'use strict';

describe('FI-SEED API', () => {
  describe('[GET /api/health]', () => {
    it('should respond a 200 status code', (done) => {
      req('/api/health', (err, res) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.be.a('number');
        expect(res.statusCode).to.equal(200);

        done();
      });
    });
  });
});
