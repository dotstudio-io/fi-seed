/* jshint browser: true */
/*global angular */

(function (ng) {
  'use strict';

  ng.module('App').factory('$io', function () {

    return {
      connect: function (namespace, options) {
        return window.io(namespace, options);
      }
    };

  });

}(angular));
