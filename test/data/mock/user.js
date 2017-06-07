'use strict';

const CONSTS = require('fi-consts');

const PASSWORD = 'password';

/**
 * A mock a file should always be a function that returns the mock object 
 */
module.exports = (utils) => {

  return {
    name: utils.randomAlpha(),
    
    email: utils.randomEmail(),

    password: PASSWORD,

    gender: CONSTS.GENDERS.MALE,

    roles: CONSTS.ROLES.USER
  };

};