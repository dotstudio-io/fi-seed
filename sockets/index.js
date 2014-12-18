/*jshint node: true */
'use strict';

module.exports = function (io, sesscfg) {

    /* Initialize messaging socket */
    require('./messaging')(io, sesscfg);
    require('./conference')(io);

};
