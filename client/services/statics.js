/*jslint nomen: true, browser: true */
/*global angular, console */

(function () {
    'use strict';

    angular.module('App').factory('$statics', function ($http, $q) {

        return {
            get: function (param) {
                var deferred = $q.defer(),
                    name = '',
                    query = {};

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

    });

}());
