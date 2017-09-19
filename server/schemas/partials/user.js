'use strict';

const CONSTS = require('fi-consts');
const is = require('fi-is');

const GENDER_FEMALE = CONSTS.GENDERS.FEMALE;
const GENDER_MALE = CONSTS.GENDERS.MALE;
const ROLE_ADMIN = CONSTS.ROLES.ADMIN;
const ROLE_USER = CONSTS.ROLES.USER;

module.exports = {

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: is.email
  },

  password: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum: [
      GENDER_FEMALE, GENDER_MALE
    ]
  },

  roles: {
    type: [String],
    default: [ROLE_USER],
    required: true,
    enum: [
      ROLE_ADMIN, ROLE_USER
    ]
  }

};
