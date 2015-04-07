/* global angular */

(function (ng) {
  'use strict';

  ng.module('App').factory('$statics', [
    '$http', '$q',

    function ($http, $q) {

      return {

        get: function (param) {
          var deferred = $q.defer(),
              query = {},
              name = '';

          if (param) {
            if (angular.isArray(param) || angular.isString(param)) {
              query.params = {
                statics: param
              };
            } else {
              throw new TypeError("Wrong parameter type! Must be a String or an Array.");
            }

            $http.get('/api/statics' + name, query).success(function (data) {
              deferred.resolve(data);
            }).error(function (data, status) {
              deferred.reject(data, status);
            });
          } else {
            throw new TypeError("Parameter cannot be null!");
          }

          return deferred.promise;
        }

      };

    }
  ]);

}(angular));
