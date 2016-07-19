'use strict';

module.exports = (req, res, next) => {
  if (req.method === 'GET' && req.path === '/api/health') {
    return res.sendStatus(200);
  }

  next();
};
