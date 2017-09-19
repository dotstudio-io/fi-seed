'use strict';

const credentials = require('fi-credentials');
const expect = require('chai').expect;
const request = require('request');
const fi = require('fi-utils');
const path = require('path');

fi.init({
  serverdir: path.join(process.cwd(), 'server'),
  basedir: path.join(process.cwd())
});

const PORT = fi.config('server').port;

describe('Fi Seed', function () {

  before(function (done) {
    credentials.load(fi.config('credentials'))

      .then(done)

      .catch(done);
  });

  describe('Server', function () {

    it(`should be running on port ${ PORT }`, function (done) {
      request(`http://localhost:${ PORT }`, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(200);

        done();
      });
    });

    it('should provide a session cookie', function (done) {
      request(`http://localhost:${ PORT }`, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.headers['set-cookie']).to.be.an('array');
        expect(res.headers['set-cookie'].join(' '))
          .to.contain(fi.config('session').name);

        done();
      });
    });

    it('should provide a CSRF token cookie', function (done) {
      request(`http://localhost:${ PORT }`, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.headers['set-cookie']).to.be.an('array');
        expect(res.headers['set-cookie'].join(' '))
          .to.contain(fi.config('security').csrf.cookie.name);

        done();
      });
    });

    it('should provide a CSP policy header', function (done) {
      request(`http://localhost:${ PORT }`, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.headers['content-security-policy']).to.be.a('string');

        done();
      });
    });

    it('should provide a XSS protection header', function (done) {
      request(`http://localhost:${ PORT }`, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.headers['x-xss-protection']).to.be.a('string');

        done();
      });
    });

    it('should provide a X-FRAME options header', function (done) {
      request(`http://localhost:${ PORT }`, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.headers['x-frame-options']).to.be.a('string');

        done();
      });
    });

    it('should be provide the base web app template', function (done) {
      request(`http://localhost:${ PORT }`, (err, res, body) => {
        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.headers['content-type'])
          .to.equal('text/html; charset=utf-8');
        expect(body).be.a('string');
        expect(body).to.not.be.empty;
        expect(body).to.contain('ng-app');

        done();
      });
    });

    it('should serve a favicon', function (done) {
      request(`http://localhost:${ PORT }/favicon.ico`, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.headers['content-type']).to.equal('image/x-icon');

        done();
      });
    });

  });

});
