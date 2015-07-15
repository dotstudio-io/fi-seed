(function (ng) {
  'use strict';

  ng.module('App').factory('$statics', [
    '$http',

    function ($http) {

      return {

        get: function (param) {
          var query = {};

          if (param) {
            if (ng.isArray(param) || ng.isString(param)) {
              query.params = {
                statics: param
              };
            } else {
              throw new TypeError("Wrong parameter type! Must be a String or an Array.");
            }

            return $http.get('/api/statics', query);
          } else {
            throw new TypeError("Parameter cannot be empty!");
          }
        }

      };

    }
  ]);

}(angular));
