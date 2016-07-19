'use strict';

/**
 * Defines a read-only property on an object using the Object.defineProperty method.
 *
 * @param {Object} obj The objtect to define the property into.
 * @param {String} path The path or property name to define.
 * @param {Mixed} val The read-only property value.
 */
function defineProperty(obj, path, val) {
  Object.defineProperty(obj, path, {
    value: val
  });
}

/* User roles */
const ROLES = {};

defineProperty(ROLES, 'ADMIN', 'ROLE.ADMIN');
defineProperty(ROLES, 'USER', 'ROLE.USER');

defineProperty(module.exports, 'ROLES', ROLES);

/* User genders */
const GENDERS = {};

defineProperty(GENDERS, 'FEMALE', 'GENDER.FEMALE');
defineProperty(GENDERS, 'MALE', 'GENDER.MALE');

defineProperty(module.exports, 'GENDERS', GENDERS);

/* Errors */
const ERR = {};

/* Mongo errors */
const MONGO_ERR = {};

defineProperty(MONGO_ERR, 'VALIDATION', 'ValidationError');

defineProperty(ERR, 'MONGO', MONGO_ERR);

defineProperty(module.exports, 'ERR', ERR);

/* Codes */
const CODES = {};

/* HTTP codes */
const HTTP_CODES = {};

defineProperty(HTTP_CODES, 'OK', 200);
defineProperty(HTTP_CODES, 'CREATED', 201);
defineProperty(HTTP_CODES, 'NOBODY', 204);
defineProperty(HTTP_CODES, 'BADREQUEST', 400);
defineProperty(HTTP_CODES, 'UNAUTHORIZED', 401);
defineProperty(HTTP_CODES, 'FORBIDDEN', 403);
defineProperty(HTTP_CODES, 'NOTFOUND', 404);
defineProperty(HTTP_CODES, 'CONFLICT', 409);
defineProperty(HTTP_CODES, 'ERR', 500);

defineProperty(CODES, 'HTTP', HTTP_CODES);

/* MongoDB codes */
const MONGO_CODES = {};

defineProperty(MONGO_CODES, 'DUPLICATED', 11000);

defineProperty(CODES, 'MONGO', MONGO_CODES);

defineProperty(module.exports, 'CODES', CODES);

/* Methods */
const METHODS = {};

/* HTTP methods */
const HTTP_METHODS = {};

defineProperty(HTTP_METHODS, 'DELETE', 'DELETE');
defineProperty(HTTP_METHODS, 'HEAD', 'HEAD');
defineProperty(HTTP_METHODS, 'POST', 'POST');
defineProperty(HTTP_METHODS, 'GET', 'GET');
defineProperty(HTTP_METHODS, 'PUT', 'PUT');

defineProperty(METHODS, 'HTTP', HTTP_METHODS);

defineProperty(module.exports, 'METHODS', METHODS);
