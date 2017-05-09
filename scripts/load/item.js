'use strict';

/* Utils */
const loader = require('./_loader');

/* Vars */

/**
 *  You should rename this constant according to the mongo document you wish
 *  to load. 
 *  
 *  TODO: Load items name dinamically with prompt. 
 * 
 *  E.G: users 
 */
const ITEMS = 'items';

/* Call loader script */
loader(ITEMS);