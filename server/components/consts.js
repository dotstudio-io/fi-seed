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
