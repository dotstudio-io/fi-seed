(function (window) {
  'use strict';

  var ng = window.angular;

  var ROUTE_API_CONSTS = '/api/consts';

  function constsServiceFn($http) {

    function get(param) {
      var query = {};

      if (param) {
        if (ng.isArray(param) || ng.isString(param)) {
          query.params = {
            consts: param
          };
        } else {
          throw new TypeError('Wrong parameter type! Must be a String or an Array.');
        }

        return $http.get(ROUTE_API_CONSTS, query);
      } else {
        throw new TypeError('Parameter cannot be empty!');
      }
    }

    return {
      get: get
    };

  }

  ng.module('App').factory('$consts', [
    '$http',

    constsServiceFn
  ]);

}(window));
