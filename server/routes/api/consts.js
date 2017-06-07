'use strict';

const CONSTS = require('fi-consts');
const errors = require('fi-errors');
const is = require('fi-is');

const {

  BadRequestError

} = errors.list();

module.exports = (router) => {

  /**
   * Check if is a const value or folder.
   *    
   * @param {String} dirname This is the const value being processed.
   * @returns {Boolean}
   */
  function isConstsFolder(dirname) {

    // To be a const file every value must be an string.
    for (let key in dirname) {
      if (!is.string(dirname[key])) {
        return true;
      }
    }

    return false;
  }

  /**
   *  Walks the consts tree to process the correct consts values.
   * 
   * @param {String} filename This is the const value being processed.
   * @param {Object || null} [dirname=CONSTS] This is the consts tree level. Defaults to CONSTS.
   * 
   * @returns The processed consts values in a { key : [values] } format.
   */
  function resolveConst(filename, dirname = CONSTS) {
    var thisConst = dirname[filename];
    var result;

    // If it's folder recurse over every file.
    if (isConstsFolder(thisConst)) {
      // store filenames as property keys
      result = {};

      for (let file in thisConst) {
        result[file.toLowerCase()] = resolveConst(file, thisConst);
      }

      // If it's not a folder store every const value in an array.      
    } else {
      // store consts values in an array
      result = [];

      for (let key in thisConst) {
        result.push(thisConst[key]);
      }
    }

    return result;
  }

  /**
   * Returns consts values requested in the query.
   * 
   * The query must be constructed like consts=CONSTNAME 
   * or consts=CONSTNAME1&&consts=CONSTNAME2  
   * 
   */
  router.get('/', (req, res) => {

    // Force array
    if (is.string(req.query.consts)) {
      req.query.consts = [req.query.consts];
    }

    // Query malformed
    if (is.not.array(req.query.consts) || is.empty(req.query.consts)) {
      throw new BadRequestError();
    }

    var results = {};

    req.query.consts.forEach((name) => {
      var NAME = name.toUpperCase();
      results[NAME] = resolveConst(NAME);
    });

    res.send(results);

  });

};