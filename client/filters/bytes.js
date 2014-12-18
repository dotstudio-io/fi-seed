/* global angular */

(function () {
    'use strict';

    angular.module('App').filter('bytes', function() {

        return function(bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
                return '-';
            }

            if (!precision) {
                precision = 1;
            }

            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024)),
                size = bytes / Math.pow(1024, Math.floor(number));

            return size.toFixed(precision) + " " + units[number];
        };

    });

}());
