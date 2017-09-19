'use strict';

const CONSTS = require('fi-consts');
const errors = require('fi-errors');
const is = require('fi-is');

const {
  BadRequestError
} = errors;

/**
 * Checks if value is an object.
 *
 * @param {String} value This is the const value being processed.
 *
 * @returns {Boolean} Whether the const is a folder.
 */
function isValueAnObject(value) {
  for (let key in value) {
    /* One of it's values must be a JSON */
    if (!is.string(value[key])) {
      return true;
    }
  }

  return false;
}

/**
 *  Walks the consts tree to process the correct consts values.
 *
 * @param {String} key This is the const value being processed.
 * @param {any} [obj=CONSTS] This is the consts tree level.
 *
 * @returns {Object|Array} The processed consts values.
 */
function resolve(key, obj = CONSTS) {
  let value = obj[key];
  let result;

  if (isValueAnObject(value)) {
    /* Recurse over every file if const is a folder */
    result = {};

    for (let attribute in value) {
      result[attribute.toLowerCase()] = resolve(attribute, value);
    }
  } else {
    /* Store every const value in an array if const is not a folder */
    result = [];

    for (let key in value) {
      result.push(value[key]);
    }
  }

  return result;
}

module.exports = (router) => {

  /**
   * @api {GET} /consts Retrieves constants by name.
   * @apiName GetConst
   * @apiGroup Const
   *
   * @apiSuccess (200) {Object} data Consts data.
   *
   * @apiError (400) {String} empty No const names requested.
   */
  router.get('/', (req, res) => {

    if (is.string(req.query.consts)) {
      req.query.consts = [req.query.consts];
    }

    if (is.not.array(req.query.consts) || is.empty(req.query.consts)) {
      throw new BadRequestError();
    }

    const results = {};

    req.query.consts.forEach((name) => {
      const NAME = name.toUpperCase();
      results[NAME] = resolve(NAME);
    });

    res.send(results);

  });

};
