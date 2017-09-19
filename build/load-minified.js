'use strict';

const uglify = require('uglify-es');
const fs = require('fs');

module.exports = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf-8');
  const result = uglify.minify(code);

  if (result.error) {
    return '';
  }

  return result.code;
};
