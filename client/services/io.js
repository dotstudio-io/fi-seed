/*jshint browser: true */
/*global angular, console */

(function () {
    'use strict';

    angular.module('App').factory('$io', function () {

        return {
            connect: function (namespace, options) {
                return window.io(namespace, options);
            }
        };

    });

}());
