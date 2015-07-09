'use strict';

var path = require('path');
var os = require('os');

module.exports = {

  tempdir: path.join(os.tmpDir(), 'fi-seed', 'uploads'),

  stordir: path.join(__appdir, 'storage')

};
