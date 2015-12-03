(function (ng) {
  'use strict';

  /** EXAMPLE FILTER MODULE **/
  ng.module('App').filter('strip', function () {

    return function (value, strip) {
      return value.replace(new RegExp(strip, 'gim'), '');
    };

  });

}(angular));
